import dbConnect from "@/lib/dbConnect";
import Subscription from "@/models/Subscription";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();

  try {
    const url = new URL(request.url);
    const daysParam = url.searchParams.get('days');
    const days = daysParam ? parseInt(daysParam) : 30;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + days);

    const reminders = await Subscription.find({
      endDate: {
        $gte: today,
        $lte: futureDate,
      },
      status: 'active',
    })
      .populate({
        path: 'client',
        select: 'name email phone membershipStatus',
      })
      .sort({ endDate: 1 })
      .lean() as unknown as Array<{
      _id: string;
      endDate: Date;
      client: unknown;
      plan: string;
      status: string;
      [key: string]: unknown;
    }>;

    const enhancedReminders = reminders.map((reminder) => ({
      ...reminder,
      daysUntilExpiry: Math.ceil(
        (new Date(reminder.endDate).getTime() - today.getTime()) /
          (1000 * 60 * 60 * 24)
      ),
      isExpiringSoon: Math.ceil(
        (new Date(reminder.endDate).getTime() - today.getTime()) /
          (1000 * 60 * 60 * 24)
      ) <= 3,
    }));

    return NextResponse.json(enhancedReminders, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching subscription reminders:", error);
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
