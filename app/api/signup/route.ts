import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request:Request) {
    const {firstName, lastName, email, password} = await request.json();
    const client = await clientPromise;
    const db = client.db("testData");
    const usersCollection = db.collection("users")

    const existingUser = await usersCollection.findOne({email});
    if (existingUser) {
        return NextResponse.json({message: "User already exists."}, {status:400});
    }
    await usersCollection.insertOne({
        name: `${firstName} ${lastName}`,
        email,
        password,
        payments: [],
        apiKeys: [],
    });

    return NextResponse.json({message: "Account created Successfully!"});
}