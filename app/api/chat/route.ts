import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages, content, codeBlocks } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    messages: [
      {
        role: 'system',
        content: `You are an AI writing and coding assistant. The user is working on a document with the following content:

Current document content:
${content}

Code blocks:
${JSON.stringify(codeBlocks, null, 2)}

Provide suggestions and improvements while maintaining the document's structure.`,
      },
      ...messages,
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}