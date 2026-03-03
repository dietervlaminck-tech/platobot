import { type Message } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getConversation(conversationId: string): Promise<Message[] | undefined>;
  saveMessage(conversationId: string, message: Message): Promise<void>;
  createConversation(): Promise<string>;
}

export class MemStorage implements IStorage {
  private conversations: Map<string, Message[]>;

  constructor() {
    this.conversations = new Map();
  }

  async getConversation(conversationId: string): Promise<Message[] | undefined> {
    return this.conversations.get(conversationId);
  }

  async saveMessage(conversationId: string, message: Message): Promise<void> {
    const conversation = this.conversations.get(conversationId) || [];
    conversation.push(message);
    this.conversations.set(conversationId, conversation);
  }

  async createConversation(): Promise<string> {
    const id = randomUUID();
    this.conversations.set(id, []);
    return id;
  }
}

export const storage = new MemStorage();
