import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

  try {
    const user = await User.findById(id).select("-password"); // Do not return password
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching user:", error);
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
    const { name, email, password } = await request.json();
    
    const updateData: { name?: string; email?: string; password?: string } = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      updateData.password = await bcryptjs.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating user:", error);
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
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error deleting user:", error);
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
