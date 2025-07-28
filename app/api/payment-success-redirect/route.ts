import { NextResponse } from "next/server";

export async function POST() {
    return NextResponse.redirect("https://tedtools.com/payment-success?from=true", 307);
}