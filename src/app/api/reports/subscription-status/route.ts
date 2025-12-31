import dbConnect from "@/lib/dbConnect";
import Subscription from "@/models/Subscription";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const subscriptionStatus = await Subscription.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const report = subscriptionStatus.map(item => ({
        name: item._id,
        value: item.count
    }));

    return NextResponse.json(report, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching subscription status report:", error);
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
