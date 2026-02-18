import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");

  const where: Record<string, string> = {};
  if (status) where.status = status;
  if (priority) where.priority = priority;

  const todos = await prisma.todo.findMany({
    where,
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, description, status, priority, userId } = body;

  const todo = await prisma.todo.create({
    data: {
      title,
      description,
      status,
      priority,
      userId: parseInt(userId),
    },
    include: { user: true },
  });

  return NextResponse.json(todo, { status: 201 });
}
