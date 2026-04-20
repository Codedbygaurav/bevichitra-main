import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// ✅ GET SINGLE BLOG
export async function GET(_, { params }) {
  try {
    const { slug } = await params;

    const client = await clientPromise;
    const db = client.db("blogDB");

    const blog = await db.collection("blogs").findOne({
      _id: new ObjectId(slug),
    });

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...blog,
      _id: blog._id.toString(),
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

// ✅ UPDATE BLOG
export async function PUT(req, { params }) {
  try {
    const { slug } = await params;
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("blogDB");

    const result = await db.collection("blogs").updateOne(
      { _id: new ObjectId(slug) },
      { $set: { ...body, updatedAt: new Date() } }
    );

    if (!result.matchedCount) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Updated" });

  } catch {
    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}

// ✅ DELETE BLOG
export async function DELETE(_, { params }) {
  try {
    const { slug } = await params;

    const client = await clientPromise;
    const db = client.db("blogDB");

    const result = await db.collection("blogs").deleteOne({
      _id: new ObjectId(slug),
    });

    if (!result.deletedCount) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Deleted" });

  } catch {
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}