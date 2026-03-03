import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Quote from "@/lib/Quote";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function PUT(request, { params }) {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id } = params;
        const body = await request.json();

        const updatedQuote = await Quote.findByIdAndUpdate(id, body, { new: true });
        if (!updatedQuote) {
            return NextResponse.json({ error: "Teklif bulunamadı" }, { status: 404 });
        }
        return NextResponse.json(updatedQuote);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id } = params;

        const deletedQuote = await Quote.findByIdAndDelete(id);
        if (!deletedQuote) {
            return NextResponse.json({ error: "Teklif bulunamadı" }, { status: 404 });
        }

        return NextResponse.json({ message: "Teklif başarıyla silindi" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
