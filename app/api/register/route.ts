import bcrypt from "bcryptjs";

import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";
import prismadb from "@/app/lib/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing info.", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Registration: ", error);
    return new NextResponse("internal error.", { status: 500 });
  }
}
