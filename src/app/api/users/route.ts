import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function GET() {
  await dbConnect();

  try {
    const users = await User.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching users:", error);
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
    const salt = await bcryptjs.genSalt(10);
    body.password = await bcryptjs.hash(body.password, salt);
    
    if (!body.role) {
      body.role = 'regular';
    }

    const newUser = new User(body);
    await newUser.save();
    return NextResponse.json(newUser, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating user:", error);
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