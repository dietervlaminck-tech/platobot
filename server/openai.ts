import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@shared/system-prompt";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function chat(messages: Array<{ role: string; content: string }>): Promise<string> {
  const response = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 8192,
    system: SYSTEM_PROMPT,
    messages: messages.map(m => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  });

  const block = response.content[0];
  return block.type === "text" ? block.text : "Het spijt me, ik kon geen antwoord genereren. Probeer het opnieuw.";
}

export async function chatStream(
  messages: Array<{ role: string; content: string }>,
  onChunk: (chunk: string) => void
): Promise<void> {
  const stream = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 8192,
    system: SYSTEM_PROMPT,
    messages: messages.map(m => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    stream: true,
  });

  for await (const event of stream) {
    if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
      onChunk(event.delta.text);
    }
  }
}
