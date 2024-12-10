"use client";

import { useState } from "react";
import { Editor } from "@/components/editor/editor";
import { Chat } from "@/components/chat/chat";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export default function Home() {
  const [content, setContent] = useState("");
  const [codeBlocks, setCodeBlocks] = useState<Record<string, string>>({});

  const handlePromptSubmit = async (prompt: string) => {
    // The chat component now handles the API call using the Vercel AI SDK
    console.log("Document state:", { content, codeBlocks });
  };

  return (
    <div className="h-screen bg-background">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30} minSize={20}>
          <Chat
            content={content}
            codeBlocks={codeBlocks}
            onSubmit={handlePromptSubmit}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={70}>
          <Editor
            content={content}
            codeBlocks={codeBlocks}
            onChange={(newContent) => setContent(newContent)}
            onCodeBlockChange={(id, code) => 
              setCodeBlocks(prev => ({ ...prev, [id]: code }))
            }
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}