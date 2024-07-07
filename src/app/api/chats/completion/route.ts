import { ChatStreamPayload } from "@/hooks/useChatDetail";
import { completionModel } from "@/lib/completionModel";
import {
  SystemMessage,
  HumanMessage,
  AIMessage,
  BaseMessageLike,
} from "@langchain/core/messages";

// Prevents this route's response from being cached on Vercel
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  // Obtain the user message from request's body
  const { userMessage, messages } = (await request.json()) as ChatStreamPayload;
  const encoder = new TextEncoder();
  // Create a streaming response
  const messageStack = messages.map((each) => {
    if (each.role === "assistant") {
      return new AIMessage(each.content);
    }
    if (each.role === "user") {
      return new HumanMessage(each.content);
    }
    return each;
  });
  const allMessages = [
    new SystemMessage(
      "You are a helpful assistant with only one task: help user task related to an event planning. You should assist users in organizing events, query handling, venue suggestion or logistical query handling. You should not engage in any conversation that is not related to event planning. If user asks for something that is not related to event planning, you should tell the user that it is not related to event planning and ask to the user if they want to ask something related to event planning, otherwise i cant help"
    ),
    ...messageStack,
    new HumanMessage(userMessage),
  ] as BaseMessageLike[];
  const customReadable = new ReadableStream({
    async start(controller) {
      // Generate a streaming response from OpenAI with LangChain
      await completionModel(controller, encoder).invoke(allMessages);
    },
  });
  // Return the stream response and keep the connection alive
  return new Response(customReadable, {
    // Set the headers for Server-Sent Events (SSE)
    headers: {
      Connection: "keep-alive",
      "Content-Encoding": "none",
      "Cache-Control": "no-cache, no-transform",
      "Content-Type": "text/event-stream; charset=utf-8",
    },
  });
}
