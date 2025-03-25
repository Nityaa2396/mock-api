import { users } from "@/lib/mock-data";
import { NextResponse } from "next/server";

// GET handler to fetch a specific user by ID
export async function GET(request, { params }) {
  const id = Number.parseInt(params.id);

  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const user = users.find((user) => user.id === id);

  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: user });
}
