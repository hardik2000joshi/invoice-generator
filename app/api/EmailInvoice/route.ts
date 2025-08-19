import nodemailer from 'nodemailer';

export async function POST(req:Request) {
    try {
        const {name, email} = await req.json();

        const transporter = nodemailer.createTransport({
        });

        // GMAIL smtp transporter

    }

    catch (error) {

    }
}