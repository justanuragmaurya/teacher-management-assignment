import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: true, message: "No User id" });
  }
  const teacher = await prisma.user.findUnique({ 
    where: { id: id },
    include: {
      Qualifications: true
    }
  });
  return NextResponse.json(teacher);
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  
  if (!session) {
    return NextResponse.json({ error: true, message: "Unauthorized" }, { status: 401 });
  }

  const { id, name, email, phone, address } = await req.json();

  if (!id) {
    return NextResponse.json({ error: true, message: "No User id" }, { status: 400 });
  }

  // Check if user can edit this profile
  const canEdit = session.user?.id === id || (session.user as any)?.role === "Admin";
  
  if (!canEdit) {
    return NextResponse.json({ error: true, message: "Forbidden" }, { status: 403 });
  }

  try {
    const updatedTeacher = await prisma.user.update({
      where: { id: id },
      data: {
        name,
        email,
        phone: phone ? parseInt(phone) : null,
        address,
      },
      include: {
        Qualifications: true
      }
    });

    return NextResponse.json(updatedTeacher);
  } catch (error) {
    return NextResponse.json({ error: true, message: "Failed to update profile" }, { status: 500 });
  }
}
