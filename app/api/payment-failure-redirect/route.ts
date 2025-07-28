import { NextResponse } from "next/server";

export async function POST() {
  const url = new URL("/payment-failure?from=true", process.env.NEXT_PUBLIC_URL);
  return NextResponse.redirect(url.toString(), 307);
}
