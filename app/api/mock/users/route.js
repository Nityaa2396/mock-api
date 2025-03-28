import { users } from "@/lib/mock-data";
import { NextResponse } from "next/server";

// GET handler to fetch all users
export async function GET() {
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Return a properly formatted JSON response
  return NextResponse.json({
    success: true,
    data: users,
    count: users.length,
  });
}
