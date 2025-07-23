import {NextResponse} from "next/server";

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        console.log("Webhook received:", payload);

         if (payload.event === "payment_success") {
            console.log("Payment success for:", payload.userEmail);
            }
        return NextResponse.json({status: "success"});
        }
    catch (error){
        console.error("webhook error:", error);
        return NextResponse.json({error: "Invalid webhook"}, {status: 400});
    }
}

export async function GET() {
    return NextResponse.json({
        status: "Webhook endpoint is active",
        message: "This endpoint is for receiving POST requests from payment gateway.",
    });
}