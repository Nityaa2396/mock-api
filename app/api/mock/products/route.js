import { products } from "@/lib/mock-data";
import { NextResponse } from "next/server";

// GET handler to fetch all products
export async function GET(request) {
  // Get query parameters
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const inStock = searchParams.get("inStock");

  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  let filteredProducts = [...products];

  // Apply filters if provided
  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (inStock !== null) {
    const inStockBool = inStock === "true";
    filteredProducts = filteredProducts.filter(
      (product) => product.inStock === inStockBool
    );
  }

  return NextResponse.json({
    success: true,
    data: filteredProducts,
    count: filteredProducts.length,
  });
}
