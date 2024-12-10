export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
}

export interface CodeBlock {
  id: string;
  content: string;
  language: string;
}