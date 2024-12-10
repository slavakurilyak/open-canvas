import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "@/lib/editor";

export const extensions = [
  StarterKit,
  CodeBlockLowlight.configure({
    lowlight,
  }),
];