import dbConnect from "@/lib/dbConnect";
import Client from "@/models/Client";
import Payment from "@/models/Payment";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const totalClients = await Client.countDocuments();
    const totalPayments = await Payment.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const report = {
      totalClients,
      totalRevenue: totalPayments.length > 0 ? totalPayments[0].total : 0,
    };

    return NextResponse.json(report, { status: 200 });
  } catch (error: unknown) {
    console.error("Error generating report:", error);
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
