import { prisma } from "@/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { chatId: string } }
) {
  try {
    const chatId = params.chatId;

    const result = await prisma.chat.findUnique({
      where: {
        id: chatId,
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
