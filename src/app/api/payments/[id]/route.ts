import dbConnect from "@/lib/dbConnect";
import Payment from "@/models/Payment";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

  try {
    const payment = await Payment.findById(id).populate('client');
    if (!payment) {
      return NextResponse.json({ message: "Payment not found" }, { status: 404 });
    }
    return NextResponse.json(payment, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching payment:", error);
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
    const updatedPayment = await Payment.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).populate('client');

    if (!updatedPayment) {
      return NextResponse.json({ message: "Payment not found" }, { status: 404 });
    }
    return NextResponse.json(updatedPayment, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating payment:", error);
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
    const deletedPayment = await Payment.findByIdAndDelete(id);

    if (!deletedPayment) {
      return NextResponse.json({ message: "Payment not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Payment deleted" }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error deleting payment:", error);
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
