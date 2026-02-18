import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const todo = await prisma.todo.update({
    where: { id: parseInt(id) },
    data: body,
    include: { user: true },
  });

  return NextResponse.json(todo);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.todo.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json({ message: "Deleted" });
}
