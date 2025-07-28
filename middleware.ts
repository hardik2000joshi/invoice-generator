import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();

    if (
        request.method === 'POST' &&
        (url.pathname === '/payment-success' || url.pathname === '/payment-failure')
    ) 
    {
        return NextResponse.redirect(url, 307);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/payment-success', '/payment-failure'],
};