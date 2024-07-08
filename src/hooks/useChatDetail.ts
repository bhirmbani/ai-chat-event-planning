"use client";
import {
  SendMessageProps,
  getChatDetail,
  sendMessage,
  updateMessage,
} from "@/services/chats";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChatMessageItem } from "@/types";
import { useAtom } from "jotai";
import { countMessageAtom, wordCloudAtom } from "@/store";

export interface ChatStreamPayload {
  userMessage: string;
  messages: ChatMessageItem[];
}

export default function useChatDetail() {
  const [latestMessage, setLatestMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const [, setCount] = useAtom(countMessageAtom);
  const [wordCloud, setWordCloud] = useAtom(wordCloudAtom);
  const [isStream, setIsStream] = useState<"init" | "in-progress" | "done">(
    "init"
  );

  const chatId = searchParams.get("chatId");

  const { isLoading, data } = useSWR(
    "chatDetail",
    () => getChatDetail(`${chatId}`),
    {
      revalidateOnFocus: false,
      onSuccess(data) {
        const allMessages = data.data?.result
          .messages as unknown as ChatMessageItem[];
        setMessages(allMessages);
        setCount(allMessages.length);
      },
    }
  );

  const { trigger } = useSWRMutation("/chats/message", sendMessage, {
    onSuccess: (data) => {
      const allMessages = data.data?.result
        .messages as unknown as ChatMessageItem[];
      setMessages(allMessages);
      obtainAPIResponse("/api/chats/completion", {
        userMessage: message,
        messages,
      });
      const allPreviousWordCloud = wordCloud.toLowerCase();
      setWordCloud(allPreviousWordCloud + " " + message);
    },
  });

  const { trigger: triggerUpdate } = useSWRMutation(
    "/chats/message",
    updateMessage
  );

  const obtainAPIResponse = async (
    apiRoute: string,
    apiData: ChatStreamPayload
  ) => {
    // Initiate the first call to connect to SSE API
    try {
      setIsStream("in-progress");
      const apiResponse = await fetch(apiRoute, {
        method: "POST",
        headers: {
          "Content-Type": "text/event-stream",
        },
        body: JSON.stringify(apiData),
      });

      if (!apiResponse.body) return;

      // To decode incoming data as a string
      const reader = apiResponse.body
        .pipeThrough(new TextDecoderStream())
        .getReader();

      let incomingMessage = "";

      const assistantMessage = {
        id: "",
        role: "assistant",
        content: incomingMessage,
        createdAt: new Date(),
      } as ChatMessageItem;
      setMessages((prev) => [...prev, assistantMessage] as ChatMessageItem[]);

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          setLatestMessage("");
          break;
        }

        if (value) {
          // Append the incoming data to latest message's value
          incomingMessage += value;
          const assistantMessage = {
            id: "",
            role: "assistant",
            content: incomingMessage,
            createdAt: new Date(),
          } as ChatMessageItem;
          setLatestMessage(incomingMessage);

          setMessages((prev) => {
            const newMessages = prev.map((each, idx) => {
              if (each.id === "") {
                return assistantMessage;
              }
              return each;
            });
            return newMessages;
          });
          setMessage("");
        } else {
          // Update the latest message's state with the incoming data
          setLatestMessage(incomingMessage);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsStream("done");
    }
  };

  const onSendMessage = (payload: SendMessageProps) => {
    trigger(payload);
  };

  useEffect(() => {
    if (latestMessage) {
      setCount(messages.length);
      if (isStream === "done") {
        triggerUpdate({
          messages: messages,
          chatId: `${chatId}`,
          latestMessage: latestMessage,
        });
      }
    }
  }, [
    chatId,
    isStream,
    latestMessage,
    messages,
    messages.length,
    setCount,
    triggerUpdate,
  ]);

  return {
    isLoading,
    data,
    chatId,
    onSendMessage,
    messages,
    latestMessage,
    setMessage,
    message,
  };
}
