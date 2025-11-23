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

export async function DELETE(request: Request) {
  await dbConnect();

  try {
    const { _id } = await request.json();
    if (!_id) {
      return NextResponse.json({ message: "Client ID is required" }, { status: 400 });
    }
    const deletedClient = await Client.findByIdAndDelete(_id);
    if (!deletedClient) {
      return NextResponse.json({ message: "Client not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Client deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error deleting client:", error);
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

export async function PUT(request: Request) {
  await dbConnect();

  try {
    const { _id, ...updateData } = await request.json();

    if (!_id) {
      return NextResponse.json({ message: "Client ID is required" }, { status: 400 });
    }

    const updatedClient = await Client.findByIdAndUpdate(_id, updateData, { new: true });

    if (!updatedClient) {
      return NextResponse.json({ message: "Client not found" }, { status: 404 });
    }

    return NextResponse.json(updatedClient, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating client:", error);
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