import dbConnect from "@/lib/dbConnect";
import Subscription from "@/models/Subscription";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const subscriptions = await Subscription.find({}).populate('client');
    return NextResponse.json(subscriptions, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching subscriptions:", error);
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
    const newSubscription = new Subscription(body);
    await newSubscription.save();
    return NextResponse.json(newSubscription, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating subscription:", error);
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
