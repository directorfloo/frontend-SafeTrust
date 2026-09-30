import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    return NextResponse.json(
      { error: "Wallet authentication backend is not configured" },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(`${backendUrl}/api/auth/wallet/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(await request.json()),
      cache: "no-store",
    });
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Wallet verification proxy error:", error);
    return NextResponse.json(
      { error: "Unable to verify wallet challenge" },
      { status: 502 },
    );
  }
}