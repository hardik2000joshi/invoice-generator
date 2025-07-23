import { NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/mongodb";


export async function POST (request:Request) {
    const client = await clientPromise;
    const db = client.db('testData');
    const users = db.collection('users');

    const cookieHeader = request.headers.get("cookie");
    if (!cookieHeader) {
        return NextResponse.json({message: "unauthorized, no cookies found"}, {status: 401});
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

    const user = await users.findOne({email: userEmail});
    if (!user) {
      return NextResponse.json({message: "User not found"}, {status: 404});
    } 

    const newApiKey = crypto.randomBytes(32).toString("hex");

    await users.updateOne(
  { email: userEmail },
  {
    $push: {
      apiKeys:{
        key: newApiKey,
        createdAt: new Date(),
        isActive: true,
      },
     },
    } as any
    );

    return NextResponse.json({
      message: "API Key generated successfully",
      apiKey: newApiKey,
    });
}