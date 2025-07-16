import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
    const { email, password } = await request.json();

    const client = await clientPromise;
    const db = client.db("testData");
    const user = await db.collection("users").findOne({ email, password });

    if (!user) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const response = new NextResponse(JSON.stringify({ message: "Login Successful" }), {
        status: 200,
        headers: {
            "Set-Cookie": `userEmail=${encodeURIComponent(email)}; Path=/; HttpOnly; SameSite=Lax`,
            "Content-Type": "application/json",
        },
    });

    return response;
}