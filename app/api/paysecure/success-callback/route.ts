import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();
  const { payment_id, extra_param } = payload;

  const ersrCode = extra_param?.ERSR;

  if (!payment_id || !ersrCode) {
    return NextResponse.json({ error: "Missing payment_id or ERSR" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("testData");
  const result = await db.collection("users").updateOne(
    { "payments.extraParam.ERSR": ersrCode },
    {
      $set: {
        "payments.$.paymentId": payment_id,
        "payments.$.status": "success",
      },
    }
  );

  if (result.modifiedCount === 0) {
    console.error("No payment matched for ERSR:", ersrCode);
    return NextResponse.json({ error: "No matching payment found" }, { status: 404 });
  }

  console.log("payment updated for ERSR:", ersrCode);

  return NextResponse.json({ message: "Payment updated successfully" });
}

