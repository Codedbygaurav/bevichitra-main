import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {

  const { id } = await params;   // ✅ correct fix

  const body = await req.json();

  const client = await clientPromise;
  const db = client.db("blogDB");

  const result = await db.collection("blogs").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...body,
        updatedAt: new Date(),
      },
    }
  );

  return NextResponse.json({
    message: "Blog updated",
    result,
  });
}