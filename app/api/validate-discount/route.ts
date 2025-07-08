import { NextResponse } from "next/server";

const validDiscountCodes: Record<string, number> = {
    MASTER: 20,
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {code} = body;

        if (!code || typeof code !== 'string') {
            return NextResponse.json(
                {success: false, message: "Discount code is required."},
                {status: 400}
            );
        }

        const normalizedCode = code.trim().toUpperCase();

         if (normalizedCode in validDiscountCodes) {
      return NextResponse.json({
        success: true,
        discount: validDiscountCodes[normalizedCode],
        message: "Discount code applied successfully.",
      });
    } 
    else {
        return NextResponse.json(
        { success: false, message: "Invalid or expired discount code." },
        { status: 404 }
      );
    }

    }
    catch (error) {
        console.error("Discount validation error:", error);
        return NextResponse.json(
            { success: false, message: "Server error while validating discount code." },
      { status: 500 }
        );
    }
    }