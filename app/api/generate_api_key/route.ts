import { NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/mongodb";


export async function POST () {
    const client = await clientPromise;
    const db = client.db('testData');
    const users = db.collection('users');

    const apiKey = "sk_" + crypto.randomBytes(24).toString("hex");

        await users.updateOne(
  { email: "hardik@example.com" },
  {
    $push: {
      apiKeys: {
        key: apiKey,
        createdAt: new Date()
      } as any
    }
  }
);

    return NextResponse.json({apiKey});
}