import { z } from "zod";

export const messageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
  timestamp: z.number().optional(),
});

export const chatRequestSchema = z.object({
  message: z.string().min(1, "Bericht mag niet leeg zijn"),
  conversationId: z.string().optional().nullable(),
});

export type Message = z.infer<typeof messageSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;

export interface ChatResponse {
  response: string;
  conversationId: string;
}
