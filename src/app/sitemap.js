import clientPromise from "@/lib/mongodb";
import { projectImages } from "@/data/projectImages";

export default async function sitemap() {
  // 🔹 SAFE blog fetch
  let blogs = [];
  try {
    const client = await clientPromise;
    const db = client.db();
    blogs = await db.collection("blogs").find({}).toArray();
  } catch (e) {
    console.error("Sitemap DB error:", e);
  }

  // 🔹 Map blog URLs
  const blogUrls = blogs.map((blog) => ({
    url: `https://bevichitra.com/blogs/${blog.slug}`,
    lastModified: new Date(
      blog.updatedAt || blog.createdAt || Date.now()
    ),
  }));

  // 🔹 Map project URLs
  const projectUrls = projectImages.map((project) => ({
    url: `https://bevichitra.com/our-work/${project.slug}`,
    lastModified: new Date(),
  }));

  // 🔹 Final sitemap
  return [
    {
      url: "https://bevichitra.com",
      lastModified: new Date(),
    },
    {
      url: "https://bevichitra.com/about-us",
      lastModified: new Date(),
    },
    {
      url: "https://bevichitra.com/contact-us",
      lastModified: new Date(),
    },
    {
      url: "https://bevichitra.com/blogs",
      lastModified: new Date(),
    },
    {
      url: "https://bevichitra.com/our-work",
      lastModified: new Date(),
    },
    ...blogUrls,
    ...projectUrls,
  ];
}