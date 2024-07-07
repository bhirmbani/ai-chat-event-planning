import { prisma } from "@/client";
import { SendMessageProps, UpdateMessageProps } from "@/services/chats";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Prevents this route's response from being cached on Vercel
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const requestBody = (await req.json()) as SendMessageProps;

    // find chat by chat id
    const chat = await prisma.chat.findUnique({
      where: {
        id: requestBody.chatId,
      },
    });

    const prevChats = chat?.messages || [];

    const messages = [
      ...prevChats,
      {
        content: requestBody.message,
        role: requestBody.role,
        createdAt: new Date(),
      },
    ] as Prisma.InputJsonValue[];

    const result = await prisma.chat.update({
      where: {
        id: requestBody.chatId,
      },
      data: {
        messages: messages,
      },
    });

    return NextResponse.json({ result, status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: "error" }, { status: 500 });
    }
  }
}

export async function PUT(req: NextRequest) {
  try {
    const requestBody = (await req.json()) as UpdateMessageProps;

    const newMessages = requestBody.messages.map((each, idx) => {
      if (each.id === "") {
        const { id, ...rest } = each;
        return {
          ...rest,
          content: requestBody.latestMessage,
        };
      }
      return each;
    }) as unknown as Prisma.InputJsonValue[];

    const result = await prisma.chat.update({
      where: {
        id: requestBody.chatId,
      },
      data: {
        messages: newMessages,
      },
    });

    return NextResponse.json({ result, status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: "error" }, { status: 500 });
    }
  }
}
