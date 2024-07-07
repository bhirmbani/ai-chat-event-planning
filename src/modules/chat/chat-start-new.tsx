"use client";

import { Button } from "@/components/ui/button";
import useNewChat from "@/hooks/useNewChat";

interface StartNewChatProps {
  userId: string;
}

export default function StartNewChat({ userId }: StartNewChatProps) {
  const { onStartNewChat } = useNewChat({ userId });
  return <Button onClick={() => onStartNewChat()}>Start new chat</Button>;
}
