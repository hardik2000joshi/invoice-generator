import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import {userData} from "@/app/api/generate_api_key/route"
export async function GET() {
    const client = await clientPromise;
    const db = client.db('testData');
    const users = db.collection('users');

    const user = await users.findOne({email:"hardik@example.com"});

    return NextResponse.json(
        {
            name: user?.name,
            email: user?.email,
            payments: user?.payments || [],
            apiKeys: user?.apiKeys || [],
        });
}