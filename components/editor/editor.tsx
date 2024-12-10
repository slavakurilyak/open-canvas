"use client";

import { useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Card } from "@/components/ui/card";
import { EditorToolbar } from "./editor-toolbar";
import { extensions } from "./extensions";

interface EditorProps {
  content: string;
  codeBlocks: Record<string, string>;
  onChange: (content: string) => void;
  onCodeBlockChange: (id: string, content: string) => void;
}

export function Editor({ content, codeBlocks, onChange, onCodeBlockChange }: EditorProps) {
  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <EditorToolbar editor={editor} />
      <div className="flex-1 overflow-y-auto p-4">
        <EditorContent editor={editor} className="prose dark:prose-invert max-w-none" />
      </div>
    </Card>
  );
}