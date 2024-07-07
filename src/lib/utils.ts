import { ChatMessageItem } from "@/types";
import { Chat } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function takeMessagesForWordCloud(chat: Chat[]): string {
  let combined = "";

  chat.forEach((item) => {
    item.messages.forEach((message) => {
      const chatMessageItem = message as unknown as ChatMessageItem;
      if (chatMessageItem.role === "user") {
        combined += chatMessageItem.content + " ";
      }
    });
  });
  return combined;
}
