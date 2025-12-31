import dbConnect from "@/lib/dbConnect";
import Payment from "@/models/Payment";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const monthlyIncome = await Payment.aggregate([
      {
        $group: {
          _id: { month: { $month: "$date" }, year: { $year: "$date" } },
          totalIncome: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    const report = monthlyIncome.map(item => ({
        name: `${monthNames[item._id.month - 1]} ${item._id.year}`,
        income: item.totalIncome
    }));

    return NextResponse.json(report, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching monthly income report:", error);
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
