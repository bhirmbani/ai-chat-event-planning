"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useChatDetail from "@/hooks/useChatDetail";
import { cn } from "@/lib/utils";
import { CornerDownLeftIcon } from "lucide-react";
import { useId } from "react";

interface ChatOutputProps {
  userId: string;
}

export default function ChatOutput({ userId }: ChatOutputProps) {
  const {
    chatId,
    data,
    onSendMessage,
    message,
    messages,
    setMessage,
  } = useChatDetail();

  const key = useId();

  if (!chatId) {
    return (
      <div className="relative flex h-full min-h-[50vh] flex-col items-center justify-center rounded-xl bg-muted/50 p-4 lg:col-span-2 lg:col-start-2 md:col-start-2">
        <Badge variant="outline" className="absolute right-3 top-3">
          Output
        </Badge>
        <p className="text-center text-muted-foreground">
          No conversation selected.
        </p>
      </div>
    );
  }


  return (
    <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 lg:col-start-2 md:col-start-2">
      <Badge variant="outline" className="absolute right-3 top-3">
        Output
      </Badge>
      <Badge variant="outline" className="absolute left-3 top-3">
        {data?.data?.result?.id}
      </Badge>
      <div className="flex-1 mt-4">
        <div className="h-full gap-2 justify-end flex flex-col mb-4">
          {messages.map((each) => (
            <div
              className={cn(
                "flex w-full",
                each.role === "user" ? "justify-end" : "justify-start"
              )}
              key={key}
            >
              <Card
                className={cn(
                  each.role === "user" ? "bg-primary" : "bg-inherit"
                )}
              >
                <CardContent className="pt-4 px-4 flex flex-col items-end">
                  <CardDescription
                    className={cn(
                      each.role === "user" ? "text-right text-primary-foreground" : "text-left",
                      "w-full"
                    )}
                  >
                    {each.role}
                  </CardDescription>
                  <p className={cn(each.role === "user" ? "text-primary-foreground" : "text-inherit")}>{each.content}</p>
                </CardContent>
                <CardFooter className={cn("pb-4 px-4 flex flex-col items-end")}>
                  <small
                    className={cn(
                      "w-full",
                      each.role === "user" ? "text-right text-primary-foreground" : "text-left"
                    )}
                  >
                    {new Date(each.createdAt).toLocaleString()}
                  </small>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div
        className="relative overflow-hidden mt-4 rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        x-chunk="dashboard-03-chunk-1"
      >
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center p-3 pt-0">
          <Button
            onClick={() => onSendMessage({ chatId, role: "user", message })}
            type="submit"
            size="sm"
            className="ml-auto gap-1.5"
          >
            Send Message
            <CornerDownLeftIcon className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
