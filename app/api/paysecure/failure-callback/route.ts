import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
    try {
    const body = await req.json();
    console.log("Failure Callback Body:", JSON.stringify(body, null, 2));

    const purchaseId = body?.message?.purchaseId;

    if (!purchaseId) {
        return NextResponse.json({error: "Missing purchase id"}, {status:400});
    }

    const client = await clientPromise;
    const db = client.db("testData");

    // update payment status to 'failed'
    const result = await db.collection("users").updateOne(
        {"payments.paymentId": purchaseId},
        {$set: 
            {"payments.$.status": "failed",
            },
        }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "No matching payment found" }, { status: 404 });
    }

    console.log("Payment status updated to 'failed' for purchaseId:", purchaseId);

    return NextResponse.json ({message: "Payment marked as failed"}, { status: 200 });
    }

    catch (err) {
        console.error("Failure callback error:", err);
        return NextResponse.json({error: "Internal Server Error"}, {status:500});
    }
}