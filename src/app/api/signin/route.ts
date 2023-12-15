import User from "@/models/user";
import { connectDatabase } from "@/database/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { email, password } = await req.json();

  try {
    await connectDatabase();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials, please check and try again" },
        { status: 401 }
      );
    } else {
      const passwordIsCorrect = await user.comparePassword(password);

      if (!passwordIsCorrect) {
        return NextResponse.json(
          { message: "Password is incorrect, please check and try again" },
          { status: 401 }
        );
      } else {
        return NextResponse.json({ user }, { status: 200 });
      }
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
