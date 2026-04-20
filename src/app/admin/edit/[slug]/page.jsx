import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import EditBlogForm from "@/components/admin/EditBlogForm";

async function getBlog(id) {
  const client = await clientPromise;
  const db = client.db("blogDB");

  // 🔥 IMPORTANT
  if (!ObjectId.isValid(id)) return null;

  return db.collection("blogs").findOne({
    _id: new ObjectId(id),
  });
}

export default async function EditPage({ params }) {
  const { slug } = await params; // this is actually ID

  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <main className="max-w-3xl mx-auto py-20 px-6">
        <h1 className="text-xl font-bold">Blog not found</h1>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto py-10 px-6">
      <EditBlogForm blog={JSON.parse(JSON.stringify(blog))} />
    </main>
  );
}