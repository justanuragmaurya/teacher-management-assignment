import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { teacherId } = await req.json();

  if (!teacherId) {
    return NextResponse.json({ error: true, message: "No Teacher id" });
  }

  try {
    const availability = await prisma.availability.findMany({
      where: { teacherId: teacherId },
      orderBy: [
        { dayOfWeek: 'asc' },
        { timeSlot: 'asc' }
      ]
    });

    return NextResponse.json(availability);
  } catch (error) {
    console.error("Error fetching availability:", error);
    return NextResponse.json({ error: true, message: "Failed to fetch availability" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  
  if (!session) {
    return NextResponse.json({ error: true, message: "Unauthorized" }, { status: 401 });
  }

  const { availabilityId, status, teacherId } = await req.json();

  if (!availabilityId || !status) {
    return NextResponse.json({ error: true, message: "Missing required fields" }, { status: 400 });
  }

  // Check if user can edit this availability
  const canEdit = session.user?.id === teacherId || (session.user as any)?.role === "Admin";
  
  if (!canEdit) {
    return NextResponse.json({ error: true, message: "Forbidden" }, { status: 403 });
  }

  try {
    const updatedAvailability = await prisma.availability.update({
      where: { id: availabilityId },
      data: { status }
    });

    return NextResponse.json(updatedAvailability);
  } catch (error) {
    console.error("Error updating availability:", error);
    return NextResponse.json({ error: true, message: "Failed to update availability" }, { status: 500 });
  }
}
