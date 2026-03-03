import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import platoImage from "@assets/image_1762937046529.png";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);
    setStreamingMessage("");

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, conversationId }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) throw new Error("Failed to send message");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedMessage = "";
      let receivedConversationId: string | null = null;

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.conversationId && !receivedConversationId) {
                  receivedConversationId = parsed.conversationId;
                  if (!conversationId) {
                    setConversationId(parsed.conversationId);
                  }
                }
                if (parsed.content) {
                  accumulatedMessage += parsed.content;
                  setStreamingMessage(accumulatedMessage);
                }
              } catch (e) {
                console.error("Error parsing stream:", e);
              }
            }
          }
        }
      }

      setMessages(prev => [...prev, { role: "assistant", content: accumulatedMessage }]);
      setStreamingMessage("");
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Chat error:", error);
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: "Er is een fout opgetreden. Probeer het opnieuw." 
        }]);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div 
      className="relative flex h-full w-full flex-col"
      style={{
        backgroundImage: `url(${platoImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div 
        className="absolute inset-0 bg-background"
        style={{ opacity: 0.85 }}
      />
      
      <div className="relative z-10 flex h-full flex-col">
        <header className="border-b bg-background/80 backdrop-blur-sm px-4 py-3 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-xl font-bold text-foreground sm:text-2xl" data-testid="text-app-title">
              Platobot
            </h1>
            <p className="text-sm text-muted-foreground" data-testid="text-app-subtitle">
              Je persoonlijke leiderschapscoach
            </p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="mx-auto max-w-4xl space-y-4">
            {messages.length === 0 && !streamingMessage && (
              <div className="flex h-full min-h-[300px] items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-medium text-foreground sm:text-xl">
                    Vraag me wat je wilt
                  </p>
                </div>
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                data-testid={`message-${msg.role}-${idx}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-4 py-3 sm:max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-card-foreground shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm sm:text-base">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {streamingMessage && (
              <div className="flex justify-start" data-testid="message-streaming">
                <div className="max-w-[85%] rounded-lg bg-card px-4 py-3 text-card-foreground shadow-sm sm:max-w-[80%]">
                  <p className="whitespace-pre-wrap text-sm sm:text-base">{streamingMessage}</p>
                </div>
              </div>
            )}
            
            {isLoading && !streamingMessage && (
              <div className="flex justify-start" data-testid="message-loading">
                <div className="max-w-[85%] rounded-lg bg-card px-4 py-3 shadow-sm sm:max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <p className="text-sm text-muted-foreground sm:text-base">Platobot denkt na...</p>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t bg-background/80 backdrop-blur-sm px-4 py-4 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Typ je bericht..."
                className="min-h-[50px] max-h-[120px] resize-none text-sm sm:min-h-[60px] sm:text-base"
                data-testid="input-message"
              />
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                size="icon"
                className="h-[50px] w-[50px] shrink-0 sm:h-[60px] sm:w-[60px]"
                data-testid="button-send"
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </form>
            <p className="mt-3 text-center text-xs text-muted-foreground sm:text-sm" data-testid="text-chat-footer">
              Jouw gesprekken zijn vertrouwelijk en veilig
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
