/*import { NextResponse } from "next/server";
import clientPromise from '@/lib/mongodb';

export async function GET(request:Request) {
    const client = await clientPromise;
    const db = client.db('testData');

    const cookieHeader = request.headers.get('cookie');
    const userEmail = decodeURIComponent(cookieHeader?.split('userEmail=')[1]?.split(';')[0] || '');

    const user = await db.collection('users').findOne({email: userEmail});

    if (!user || !user.payments) {
        return new Response('No invoices found', {status: 404});
    }

    const csvContent = [
        ['Invoice ID', 'Amount', 'Date'],
    ];
    for (const payment of user.payments) {
        csvContent.push([payment.id, payment.amount, payment.date]);
    }

    let csvString = '';

    for (const row of csvContent) {
        csvString += row.join(',') + '\n';
    }

    return new Response(csvString, {
        headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename="invoices.csv"',
        },
    });

}*/