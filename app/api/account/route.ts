import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request:Request) {
    const client = await clientPromise;
    const db = client.db('testData');
    const usersCollection = db.collection("users");
    const contactsCollection = db.collection("contacts");

    // parse cookies
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

    const user = await usersCollection.findOne({email:userEmail});

    if (!user) {
        return NextResponse.json({message: 'user not found'}, {status:404});
    }

    const activeAPIKeys = (user.apiKeys || []).filter(
    (keyObj: any) => keyObj.isActive
  );

  // fetch contact messages for this user
  const contactMessages = await contactsCollection
  .find({email: userEmail})
  .sort({createdAt: -1})
  .toArray();

    // fetch and return user data to frontend
    // frontend should receive only active keys
    return NextResponse.json(
        {
            name: user.name,
            email: user.email,
            payments: (user.payments || []).map ((p: any) => ({
                date: (p.date)?new Date(p.date).toLocaleString():'N/A',
                id: p.paysecureResponse?.purchaseId,
                paymentId: p.paymentId || 0,
                amount: p.amount,
                discountAmount: p.discountAmount || 0,
                method: p.method,
                status: p.status,
                redirectUrl: p.redirectUrl
            })),
            apiKeys: activeAPIKeys,
            contactMessages,
        });
}