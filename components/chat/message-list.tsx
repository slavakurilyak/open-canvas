"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./message";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
}

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <ScrollArea className="flex-1 p-4">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          content={message.content}
          role={message.role}
        />
      ))}
    </ScrollArea>
  );
}