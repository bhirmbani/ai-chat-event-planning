import { prisma } from "@/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    const result = await prisma.chat.findMany({
      where: {
        userId: userId ?? "",
      },
    });

    return NextResponse.json({ result, status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'error' }, { status: 500 });
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const requestBody = (await req.json()) as { userId: string };

    const result = await prisma.chat.create({
      data: requestBody,
    });

    await prisma.chat.update({
      where: {
        id: result.id,
      },
      data: {
        name: result.id,
      },
    });

    return NextResponse.json({ result, status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'error' }, { status: 500 });
    }
  }
}
