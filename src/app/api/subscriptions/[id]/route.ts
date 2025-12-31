import dbConnect from "@/lib/dbConnect";
import Subscription from "@/models/Subscription";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

  try {
    const subscription = await Subscription.findById(id).populate('client');
    if (!subscription) {
      return NextResponse.json({ message: "Subscription not found" }, { status: 404 });
    }
    return NextResponse.json(subscription, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching subscription:", error);
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
    const updatedSubscription = await Subscription.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).populate('client');

    if (!updatedSubscription) {
      return NextResponse.json({ message: "Subscription not found" }, { status: 404 });
    }
    return NextResponse.json(updatedSubscription, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating subscription:", error);
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
    const deletedSubscription = await Subscription.findByIdAndDelete(id);

    if (!deletedSubscription) {
      return NextResponse.json({ message: "Subscription not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Subscription deleted" }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error deleting subscription:", error);
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
