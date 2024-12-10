"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  role: "user" | "assistant";
}

export function ChatMessage({ content, role }: ChatMessageProps) {
  return (
    <Card className={cn(
      "mb-4 p-4",
      role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground"
    )}>
      <div className="prose dark:prose-invert">
        {content}
      </div>
    </Card>
  );
}