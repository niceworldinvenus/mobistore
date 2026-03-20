import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const backendUrl = process.env.BACKEND_URL;

  // Validate required parameters and config
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  if (!backendUrl) {
    return NextResponse.json({ error: "BACKEND_URL not configured" }, { status: 500 });
  }

  try {
    // Proxy request to FastAPI orders endpoint
    const response = await fetch(`${backendUrl}/orders/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store", // Ensure fresh data for order history
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch orders from backend" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("Orders API Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}