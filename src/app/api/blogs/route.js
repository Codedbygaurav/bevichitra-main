import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {

  const client = await clientPromise;
  const db = client.db("blogDB");

  const blogs = await db
    .collection("blogs")
    .find({})
    .sort({ publishedAt: -1 }) // newest first
    .toArray();

  return NextResponse.json(blogs);

}

export async function POST(req) {

  const body = await req.json();

  const client = await clientPromise;
  const db = client.db("blogDB");

  const newBlog = {
    ...body,
    publishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.collection("blogs").insertOne(newBlog);

  return NextResponse.json({
    message: "Blog created"
  });

}

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    const client = await clientPromise;
    const db = client.db("blogDB");

    const { ObjectId } = await import("mongodb");

    await db.collection("blogs").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({
      message: "Blog deleted",
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}