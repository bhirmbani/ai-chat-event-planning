"use client";
import { Loader2 } from "lucide-react";
import useChatHistory from "@/hooks/useChatHistory";
import { cn } from "@/lib/utils";

interface ChatHistoryListProps {
  userId: string;
}

export default function ChatHistoryList({ userId }: ChatHistoryListProps) {
  const { data, isLoading, onClickChatItem } = useChatHistory({ userId });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full h-full">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (data?.length === 0 || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full h-full">
        <p className="text-lg text-gray-500">No chat history found.</p>
      </div>
    );
  }

  return (
    <>
      {data?.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onClickChatItem(chat.id)}
          className={cn(
            "cursor-pointer hover:bg-secondary rounded-lg py-2 px-3",
            chat.isSelected ? "bg-secondary" : "bg-none"
          )}
        >
          <p>{chat.name}</p>
        </div>
      ))}
    </>
  );
}
