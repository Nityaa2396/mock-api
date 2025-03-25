import { products } from "@/lib/mock-data";
import { NextResponse } from "next/server";

// GET handler to fetch a specific product by ID
export async function GET(request, { params }) {
  const id = Number.parseInt(params.id);

  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const product = products.find((product) => product.id === id);

  if (!product) {
    return NextResponse.json(
      { success: false, message: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: product });
}
