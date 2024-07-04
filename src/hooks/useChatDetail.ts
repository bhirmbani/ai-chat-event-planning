"use client";
import { getChatDetail } from "@/services/chats";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";

export default function useChatDetail() {
  const searchParams = useSearchParams();

  const chatId = searchParams.get("chatId");

  const { isLoading, data } = useSWR(
    "chatDetail",
    () => getChatDetail(`${chatId}`),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    isLoading,
    data,
    chatId,
  };
}
