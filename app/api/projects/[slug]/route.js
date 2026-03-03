import { connectDB } from "@/lib/mongodb";
import Project from "@/lib/Project";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { slug } = await params;
    const project = await Project.findOne({ slug });
    if (!project) {
      return NextResponse.json({ error: "Proje bulunamadı" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { slug } = await params;
    const data = await request.json();
    const project = await Project.findOneAndUpdate({ slug }, data, { new: true });
    if (!project) {
      return NextResponse.json({ error: "Proje bulunamadı" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { slug } = await params;
    const project = await Project.findOneAndDelete({ slug });
    if (!project) {
      return NextResponse.json({ error: "Proje bulunamadı" }, { status: 404 });
    }
    return NextResponse.json({ message: "Silindi" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
