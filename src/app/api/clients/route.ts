import dbConnect from "@/lib/dbConnect";
import Client from "@/models/Client";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const clients = await Client.find({});
    return NextResponse.json(clients, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching clients:", error);
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
    const newClient = new Client(body);
    await newClient.save();
    return NextResponse.json(newClient, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating client:", error);
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
