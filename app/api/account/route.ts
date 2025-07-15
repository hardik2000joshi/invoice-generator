import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request:Request) {
    const client = await clientPromise;
    const db = client.db('testData');
    const users = db.collection("users");

    const cookieHeader = request.headers.get("cookie");
    if (!cookieHeader) {
        return NextResponse.json({message: "unauthorized, no cookies found"}, {status: 404});
    }

    const cookiesobj: Record<string, string> = {};
    const cookiesArray = cookieHeader.split(";");

    for (const cookie of cookiesArray) {
        const  [key, ...rest] = cookie.trim().split("=");
        cookiesobj[key] = decodeURIComponent(rest.join("="));
    }

    const userEmail =   cookiesobj.userEmail;

    if (!userEmail) {
        return NextResponse.json({message: 'unauthorized, missing userEmail'}, {status: 404});
    }

    const user = await users.findOne({email:userEmail});

    if (!user) {
        return NextResponse.json({message: 'user not found'}, {status:404});
    }

    const validAPIKeys = (user.apiKeys || []).filter(
        (keyObj:any) => new Date(keyObj.expiresAt) > new Date()
    );

    // fetch and return user data to frontend
    // frontend should receive only active keys
    return NextResponse.json(
        {
            name: user.name,
            email: user.email,
            payments: user.payments || [],
            apiKeys: validAPIKeys,
        });
}