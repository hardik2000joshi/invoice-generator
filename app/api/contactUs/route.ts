import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
const MONGODB_URI = process.env.MONGODB_URI as string;

const contactSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    subject: String,
    message: String,
    createdAt: {type: Date, default: Date.now}
});

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

// connect to db: 
async function connectDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(MONGODB_URI);
    }
}

// Handle Post Request:  
export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        const newContact = new Contact({
            fullName: body.fullName,
            email: body.email,
            subject: body.subject,
            message: body.message,
        });

        await newContact.save();
        return NextResponse.json({
            success: true,
            message: "Message saved successfully!"
        }, 
    {
        status: 201
    });
    }

    catch(error:any) {
        return NextResponse.json({
            success: false,
            error: error.message
        },
    {
        status: 500
    });
    }
}