import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Quote from "@/lib/Quote";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
    await connectDB();

    // Sadece yetkili adminler teklifleri görebilir
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const quotes = await Quote.find({}).sort({ createdAt: -1 });
        return NextResponse.json(quotes);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    await connectDB();
    try {
        const body = await request.json();
        const newQuote = await Quote.create(body);
        return NextResponse.json(newQuote, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
