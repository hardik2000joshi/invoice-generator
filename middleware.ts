import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();

     const isFailure = url.pathname === '/payment-failure';
     const isSuccess = url.pathname === '/payment-success';
     const alreadyRedirected = url.searchParams.has('redirected');

    if (
        request.method === 'POST' &&
         (isFailure || isSuccess) &&
         !alreadyRedirected
    ) {
        url.searchParams.set('redirected', 'post');
        url.searchParams.set("from", "true");
        return NextResponse.redirect(url, 307);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/payment-success', '/payment-failure'],
};