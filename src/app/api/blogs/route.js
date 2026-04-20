import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// ✅ GET ALL BLOGS
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("blogDB");

    const blogs = await db
      .collection("blogs")
      .find({})
      .sort({ publishedAt: -1 }) // ✅ newest first
      .toArray();

    const formatted = blogs.map((blog) => ({
      ...blog,
      _id: blog._id.toString(),
    }));

    return NextResponse.json(formatted);

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// ✅ CREATE BLOG
export async function POST(req) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("blogDB");

    const newBlog = {
      ...body,
      publishedAt: new Date(),   // 🔥 CRITICAL FIX
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("blogs").insertOne(newBlog);

    return NextResponse.json({ message: "Blog created" });

  } catch (error) {
    return NextResponse.json(
      { error: "Create failed" },
      { status: 500 }
    );
  }
}