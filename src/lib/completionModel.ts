import { ChatOpenAI } from "@langchain/openai";

export const completionModel = (
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder
) =>
  new ChatOpenAI({
    modelName: "router",
    configuration: {
      baseURL: "https://withmartian.com/api/openai/v1",
    },
    openAIApiKey: process.env.NEXT_PUBLIC_MARTIAN_API_KEY,
    streaming: true,
    callbacks: [
      {
        handleLLMNewToken(token) {
          controller.enqueue(encoder.encode(`${token}`));
        },
        async handleLLMEnd(output) {
          console.log("output", output);
          controller.close();
        },
      },
    ],
  })
