import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(
        {
            name: 'Hardik Joshi',
    email: 'hardik@example.com',
    payments: [
        {id: 'INV-001', amount: '₹1200', date: '2025-07-01'},
        {id: 'INV-002', amount: '₹1200', date: '2025-07-01'},
    ],
    apiKeys: ['pk_live_abcdef123456', 'pk_live_xyz7890'],
        }
    );
    
}