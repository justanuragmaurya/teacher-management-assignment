import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  
  if (!session) {
    return NextResponse.json({ error: true, message: "Unauthorized" }, { status: 401 });
  }

  const { teacherId, title, date, rate } = await req.json();

  if (!teacherId || !title || !date || !rate) {
    return NextResponse.json({ error: true, message: "Missing required fields" }, { status: 400 });
  }

  // Check if user can add qualifications for this teacher
  const canEdit = session.user?.id === teacherId || (session.user as any)?.role === "Admin";
  
  if (!canEdit) {
    return NextResponse.json({ error: true, message: "Forbidden" }, { status: 403 });
  }

  try {
    const qualification = await prisma.qualifications.create({
      data: {
        title,
        date: new Date(date),
        rate: parseInt(rate),
        teacherid: teacherId,
      },
    });

    return NextResponse.json(qualification);
  } catch (error) {
    console.error("Error creating qualification:", error);
    return NextResponse.json({ error: true, message: "Failed to create qualification" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  
  if (!session) {
    return NextResponse.json({ error: true, message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const qualificationId = searchParams.get("id");

  if (!qualificationId) {
    return NextResponse.json({ error: true, message: "No qualification id" }, { status: 400 });
  }

  try {
    // Get the qualification to check ownership
    const qualification = await prisma.qualifications.findUnique({
      where: { id: qualificationId },
    });

    if (!qualification) {
      return NextResponse.json({ error: true, message: "Qualification not found" }, { status: 404 });
    }

    // Check if user can delete this qualification
    const canEdit = session.user?.id === qualification.teacherid || (session.user as any)?.role === "Admin";
    
    if (!canEdit) {
      return NextResponse.json({ error: true, message: "Forbidden" }, { status: 403 });
    }

    await prisma.qualifications.delete({
      where: { id: qualificationId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting qualification:", error);
    return NextResponse.json({ error: true, message: "Failed to delete qualification" }, { status: 500 });
  }
}
