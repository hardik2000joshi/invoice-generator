import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { error } from "console";

export async function POST(request:Request) {
    const client = await clientPromise;
    const db = client.db('testData');
    const cookieHeader = request.headers.get('cookie');
    
    if (!cookieHeader) {
        return NextResponse.json({error:
            'No Cookies Found'
        }, {status: 400});
    }

    const entries: string[][] = [];
    const cookiePairs = cookieHeader.split(';');
    for (const c of cookiePairs) {
        const [key, value] =  c.trim().split('=');
        entries.push([key, value]);

    }

    const cookies = Object.fromEntries(entries);
    const email = cookies.userEmail;

    if (!email) {
        return NextResponse.json({error: 'No userEmail found in cookies'}, {status: 400});
    }

    const user = await db.collection('users').findOne({email});

    if (!user) {
        return NextResponse.json({error: 'No User Found'}, {status:400});
    }

    const lastPayment = [...(user.payments || [])]
    .reverse()
    .find(p => p.status === 'initiated');

    if (!lastPayment) {
        return NextResponse.json({message: 'No Payment Initiated.'});
    }

    const purchaseId = lastPayment?.paysecureResponse?.purchaseId;
    if (!purchaseId) {
        return NextResponse.json({message: 'purchaseId not found'});
    }

    const response = await fetch(`https://staging.paysecure.net/api/v1/purchases/${purchaseId}`, {
        headers: {
            Authorization: `Bearer ${process.env.PAYSECURE_TOKEN}`,
        },
    });

    if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch payment status' }, { status: 500 });
  }

  const data = await response.json();
  const payStatus = data.status === 'SUCCESS' ? 'success' : 'failed';

  await db.collection('users').updateOne(
    { email, 'payments.paysecureResponse.purchaseId': purchaseId },
    { $set: { 'payments.$.status': payStatus } }
  );

   return NextResponse.json({ message: `Payment marked as ${payStatus}` });

}