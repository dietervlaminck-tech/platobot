import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chat, chatStream } from "./openai";
import { chatRequestSchema, type ChatResponse } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/chat/stream", async (req, res) => {
    try {
      const validatedData = chatRequestSchema.parse(req.body);
      const { message, conversationId: providedId } = validatedData;

      let conversationId = providedId;
      if (!conversationId) {
        conversationId = await storage.createConversation();
      }

      const userMessage = {
        role: "user" as const,
        content: message,
        timestamp: Date.now(),
      };

      await storage.saveMessage(conversationId, userMessage);

      const conversationHistory = await storage.getConversation(conversationId) || [];

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      res.write(`data: ${JSON.stringify({ conversationId })}\n\n`);

      let fullResponse = "";

      await chatStream(conversationHistory, (chunk) => {
        fullResponse += chunk;
        res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
      });

      res.write(`data: [DONE]\n\n`);

      const assistantMessage = {
        role: "assistant" as const,
        content: fullResponse,
        timestamp: Date.now(),
      };

      await storage.saveMessage(conversationId, assistantMessage);

      res.end();
    } catch (error: any) {
      console.error("Chat stream error:", error);
      res.write(`data: ${JSON.stringify({ error: error.message || "Er is een fout opgetreden." })}\n\n`);
      res.end();
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const validatedData = chatRequestSchema.parse(req.body);
      const { message, conversationId: providedId } = validatedData;

      let conversationId = providedId;
      if (!conversationId) {
        conversationId = await storage.createConversation();
      }

      const userMessage = {
        role: "user" as const,
        content: message,
        timestamp: Date.now(),
      };

      await storage.saveMessage(conversationId, userMessage);

      const conversationHistory = await storage.getConversation(conversationId) || [];
      
      const response = await chat(conversationHistory);

      const assistantMessage = {
        role: "assistant" as const,
        content: response,
        timestamp: Date.now(),
      };

      await storage.saveMessage(conversationId, assistantMessage);

      const chatResponse: ChatResponse = {
        response,
        conversationId,
      };

      res.json(chatResponse);
    } catch (error: any) {
      console.error("Chat error:", error);
      res.status(500).json({ 
        error: error.message || "Er is een fout opgetreden bij het verwerken van je bericht." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
