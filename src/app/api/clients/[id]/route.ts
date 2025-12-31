import dbConnect from "@/lib/dbConnect";
import Client from "@/models/Client";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

  try {
    const client = await Client.findById(id);
    if (!client) {
      return NextResponse.json({ message: "Client not found" }, { status: 404 });
    }
    return NextResponse.json(client, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching client:", error);
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
    const updatedClient = await Client.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

  try {
    const deletedClient = await Client.findByIdAndDelete(id);

    if (!deletedClient) {
      return NextResponse.json({ message: "Client not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Client deleted" }, { status: 200 });
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
