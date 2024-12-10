"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { MessageList } from "./message-list";
import { Message } from "@/lib/types";

interface ChatProps {
  content: string;
  codeBlocks: Record<string, string>;
  onSubmit: (prompt: string) => Promise<void>;
}

export function Chat({ content, codeBlocks, onSubmit }: ChatProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    body: {
      content,
      codeBlocks,
    },
    onResponse: () => {
      setIsSubmitting(false);
    },
  });

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSubmitting) return;
    setIsSubmitting(true);
    await onSubmit(input);
    handleSubmit(e);
  };

  return (
    <Card className="h-full flex flex-col">
      <MessageList
        messages={messages.map((msg) => ({
          id: msg.id,
          content: msg.content,
          role: msg.role,
        }))}
      />
      <div className="p-4 border-t">
        <form onSubmit={handleMessageSubmit} className="flex gap-2">
          <Textarea
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            className="min-h-[80px]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                handleMessageSubmit(e);
              }
            }}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isSubmitting || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}