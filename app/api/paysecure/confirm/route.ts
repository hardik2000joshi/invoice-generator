import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

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

    const payments = user.payments || [];
    const initiatedPayments = payments.filter((p:any) => p.status === 'initiated' && p?.paysecureResponse?.purchaseId);

    for (const payment of initiatedPayments) {
        const purchaseId = payment?.paysecureResponse?.purchaseId;

        if (!purchaseId) {
            console.warn("skipping invalid purchaseId:", purchaseId);
            continue;
        }
    const response = await fetch(`https://api.paysecure.net/api/v1/purchases/${purchaseId}`, {
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
}

      const updatedUser = await db.collection('users').findOne({ email });

  
    return NextResponse.json({
        message: 'Payments updated',
        payments: updatedUser?.payments || [],
    });
}