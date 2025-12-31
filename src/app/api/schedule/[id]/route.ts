import dbConnect from "@/lib/dbConnect";
import Schedule from "@/models/Schedule";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

  try {
    const schedule = await Schedule.findById(id).populate('trainer');
    if (!schedule) {
      return NextResponse.json({ message: "Schedule not found" }, { status: 404 });
    }
    return NextResponse.json(schedule, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching schedule:", error);
    let errorMessage = "Internal server error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { message: errorMessage, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

  try {
    const body = await request.json();
    const updatedSchedule = await Schedule.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).populate('trainer');

    if (!updatedSchedule) {
      return NextResponse.json({ message: "Schedule not found" }, { status: 404 });
    }
    return NextResponse.json(updatedSchedule, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating schedule:", error);
    let errorMessage = "Internal server error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { message: errorMessage, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

  try {
    const deletedSchedule = await Schedule.findByIdAndDelete(id);

    if (!deletedSchedule) {
      return NextResponse.json({ message: "Schedule not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Schedule deleted" }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error deleting schedule:", error);
    let errorMessage = "Internal server error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { message: errorMessage, error: errorMessage },
      { status: 500 }
    );
  }
}
