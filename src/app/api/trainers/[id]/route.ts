import dbConnect from "@/lib/dbConnect";
import Trainer from "@/models/Trainer";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

  try {
    const trainer = await Trainer.findById(id);
    if (!trainer) {
      return NextResponse.json({ message: "Trainer not found" }, { status: 404 });
    }
    return NextResponse.json(trainer, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching trainer:", error);
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
    const updatedTrainer = await Trainer.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTrainer) {
      return NextResponse.json({ message: "Trainer not found" }, { status: 404 });
    }
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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

  try {
    const deletedTrainer = await Trainer.findByIdAndDelete(id);

    if (!deletedTrainer) {
      return NextResponse.json({ message: "Trainer not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Trainer deleted" }, { status: 200 });
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
