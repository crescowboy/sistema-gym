import dbConnect from "@/lib/dbConnect";
import Payment from "@/models/Payment";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const payments = await Payment.find({}).populate('client');
    return NextResponse.json(payments, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching payments:", error);
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
    const newPayment = new Payment(body);
    await newPayment.save();
    return NextResponse.json(newPayment, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating payment:", error);
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
