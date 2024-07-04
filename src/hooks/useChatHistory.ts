"use client";
import { getChats } from "@/services/chats";
import { Chat } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";

interface UseChatHistoryProps {
  userId: string;
}

export interface ChatWithState extends Chat {
  isSelected: boolean;
}

export default function useChatHistory({ userId }: UseChatHistoryProps) {
  const [chatWithState, setChatWithState] = useState<ChatWithState[] | []>();
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const searchParams = useSearchParams()
  const chatId = searchParams.get("chatId");

  const { isLoading } = useSWR("chats", () => getChats(userId), {
    revalidateOnFocus: false,
    onSuccess(data) {
      if (data.data?.result.length === 0) {
        router.replace("/chat");
        return;
      }
      const chatWithState = data.data?.result.map((chat, idx) => {
        if (data.data && idx === data.data?.result.length - 1) {
          router.replace(`/chat?chatId=${chat.id}`);
          return {
            ...chat,
            isSelected: true,
          };
        }
        return {
          ...chat,
          isSelected: false,
        };
      });
      setChatWithState(chatWithState);
    },
  });

  useEffect(() => {
    mutate('chatDetail')
  }, [chatId, mutate])

  const onClickChatItem = (id: string) => {
    const updatedChatWithState = chatWithState?.map((chat) => {
      if (chat.id === id) {
        router.replace(`/chat?chatId=${chat.id}`);
        return {
          ...chat,
          isSelected: true,
        };
      }
      return {
        ...chat,
        isSelected: false,
      };
    });

    setChatWithState(updatedChatWithState);
  };

  return {
    data: chatWithState,
    isLoading,
    onClickChatItem,
  };
}
