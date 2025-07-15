import { NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/mongodb";


export async function POST (request:Request) {
    const client = await clientPromise;
    const db = client.db('testData');
    const users = db.collection('users');

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

    const newApiKey = crypto.randomBytes(32).toString("hex");

    const result = await users.updateOne(
  { email: userEmail },
  {
    $push: {
      apiKeys: {
        key: newApiKey,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      },
    },
  } as any
);

if (result.modifiedCount === 0) {
  return NextResponse.json({ message: "API key not saved." }, { status: 500 });
}

    return NextResponse.json({
      message: "API Key generated successfully",
      apiKey: newApiKey,
      expiresAt: new Date (Date.now() + 1000 * 60 * 60 * 24 * 30),
    });
}