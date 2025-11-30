import dbConnect from "@/lib/dbConnect";
import Trainer from "@/models/Trainer";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const trainers = await Trainer.find({});
    return NextResponse.json(trainers, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching trainers:", error);
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
    const newTrainer = new Trainer(body);
    await newTrainer.save();
    return NextResponse.json(newTrainer, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating trainer:", error);
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

export async function PUT(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    const updatedTrainer = await Trainer.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    return NextResponse.json(updatedTrainer, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating trainer:", error);
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

export async function DELETE(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { _id } = body;
    await Trainer.findByIdAndDelete(_id);
    return NextResponse.json(
      { message: "Trainer deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error deleting trainer:", error);
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
