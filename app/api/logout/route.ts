import { NextResponse } from "next/server";

export async function POST() {
    const response = new NextResponse (JSON.stringify({message:"Logged out successfully"}), {
        status: 200,
        headers: {
            "Set-Cookie": "userEmail=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
            "Content-Type": "application/json",
        },
    }
);
    return response;
}