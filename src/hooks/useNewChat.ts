"use client";
import { createNewChat } from "@/services/chats";
import { useSWRConfig } from "swr";

interface UseNewChatProps {
  userId: string;
}

export default function useNewChat({ userId }: UseNewChatProps) {
  const { mutate } = useSWRConfig();

  const onStartNewChat = async () => {
    await createNewChat(userId);
    mutate("chats");
  };

  return {
    onStartNewChat,
  };
}
