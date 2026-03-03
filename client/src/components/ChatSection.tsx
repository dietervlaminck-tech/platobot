import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface ChatSectionProps {
  botUrl: string;
}

export default function ChatSection({ botUrl }: ChatSectionProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section id="chat" className="w-full bg-background py-16">
      <div className="container px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-3xl font-semibold" data-testid="text-chat-heading">
              Chat with AI Assistant
            </h2>
            <p className="text-base text-muted-foreground" data-testid="text-chat-description">
              Start a conversation and get the help you need
            </p>
          </div>

          <Card className="relative overflow-hidden rounded-xl" data-testid="card-chat-container">
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" data-testid="icon-loading" />
                  <p className="text-sm text-muted-foreground">Loading chatbot...</p>
                </div>
              </div>
            )}
            <div className="h-[700px] w-full md:h-[600px] lg:h-[700px]">
              <iframe
                src={botUrl}
                className="h-full w-full"
                style={{ border: 'none' }}
                title="AI Chatbot"
                onLoad={() => setIsLoading(false)}
                aria-label="Chatbot conversation interface"
                data-testid="iframe-chatbot"
              />
            </div>
          </Card>

          <p className="mt-4 text-center text-sm text-muted-foreground" data-testid="text-chat-footer">
            Your conversations are secure and private
          </p>
        </div>
      </div>
    </section>
  );
}
