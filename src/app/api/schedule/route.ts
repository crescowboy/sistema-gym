import dbConnect from "@/lib/dbConnect";
import Schedule from "@/models/Schedule";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const schedule = await Schedule.find({}).populate('trainer');
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

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const newSchedule = new Schedule(body);
    await newSchedule.save();
    return NextResponse.json(newSchedule, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating schedule:", error);
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
