"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { calculateReadingTime } from "@/lib/utils/readingTIme.js";

export default function CreateBlog() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "",
    author: "rahul",
    tags: "",
    coverImage: "",
  });

  const [content, setContent] = useState([]);

  function generateSlug(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      setForm((prev) => ({
        ...prev,
        title: value,
        slug: generateSlug(value),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addBlock = (type) => {
    if (type === "section") {
      setContent([...content, { type: "section", content: [] }]);
    }
    if (type === "image") {
      setContent([...content, { type: "image", url: "", alt: "" }]);
    }
    if (type === "quote") {
      setContent([...content, { type: "quote", text: "" }]);
    }
  };

  const updateBlock = (index, field, value) => {
    const updated = [...content];
    updated[index][field] = value;
    setContent(updated);
  };

  const removeBlock = (index) => {
    setContent(content.filter((_, i) => i !== index));
  };

  const addInnerBlock = (sectionIndex, type) => {
    const updated = [...content];

    if (!updated[sectionIndex].content) {
      updated[sectionIndex].content = [];
    }

    if (type === "heading") {
      updated[sectionIndex].content.push({ type: "heading", text: "" });
    }
    if (type === "subheading") {
      updated[sectionIndex].content.push({ type: "subheading", text: "" });
    }
    if (type === "paragraph") {
      updated[sectionIndex].content.push({ type: "paragraph", text: "" });
    }
    if (type === "bullet") {
      updated[sectionIndex].content.push({ type: "bullet", items: [""] });
    }

    setContent(updated);
  };

  const removeInnerBlock = (sectionIndex, innerIndex) => {
    const updated = [...content];
    updated[sectionIndex].content = updated[sectionIndex].content.filter(
      (_, i) => i !== innerIndex
    );
    setContent(updated);
  };

  const handleUpload = async (file) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error();

      setForm((prev) => ({
        ...prev,
        coverImage: data.url,
      }));
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.slug) {
      alert("Title and slug required");
      return;
    }

    if (!form.coverImage) {
      alert("Cover image required");
      return;
    }

    if (content.length === 0) {
      alert("Add at least one content block");
      return;
    }

    try {
      setLoading(true);

      const readTime = calculateReadingTime(content);

      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          readTime,
          tags: form.tags
            ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
            : [],
          content,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed");

      router.push("/admin");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto py-16 mt-20 px-6 space-y-10 bg-[var(--bg-main)] text-[var(--text-primary)]">
      <h1 className="text-4xl font-bold">Create Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* BLOG INFO */}
        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-6 space-y-5">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-[var(--border)] p-3 rounded-lg bg-transparent"
          />

          <input
            value={form.slug}
            readOnly
            className="w-full border border-[var(--border)] p-3 rounded-lg bg-[var(--bg-secondary)]"
          />

          <textarea
            name="excerpt"
            placeholder="Excerpt"
            value={form.excerpt}
            onChange={handleChange}
            className="w-full border border-[var(--border)] p-3 rounded-lg bg-transparent"
          />
        </div>

        {/* META */}
        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="border border-[var(--border)] p-3 rounded-lg bg-transparent"
            />

            <select
              name="author"
              value={form.author}
              onChange={handleChange}
              className="border border-[var(--border)] p-3 rounded-lg bg-transparent"
            >
              <option value="gaurav">Gaurav</option>
              <option value="rahul">Rahul</option>
              <option value="saurabh">Saurabh</option>
            </select>
          </div>

          <input
            name="tags"
            placeholder="Tags"
            value={form.tags}
            onChange={handleChange}
            className="w-full border border-[var(--border)] p-3 rounded-lg bg-transparent"
          />
        </div>

        {/* COVER IMAGE */}
        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-6 space-y-4">
          <input type="file" onChange={(e) => handleUpload(e.target.files[0])} />

          {uploading && <p className="text-[var(--text-secondary)]">Uploading...</p>}

          {form.coverImage && (
            <img src={form.coverImage} className="max-h-60 rounded-lg" />
          )}
        </div>

        {/* CONTENT BUILDER */}
        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-semibold">Content Builder</h2>

          {content.map((block, index) => (
            <div key={index} className="border border-[var(--border)] p-4 rounded-lg space-y-3">

              <div className="flex justify-between">
                <span>{block.type}</span>
                <button
                  type="button"
                  onClick={() => removeBlock(index)}
                  className="text-[var(--color-red)]"
                >
                  Delete
                </button>
              </div>

              {block.type === "section" && (
                <div className="space-y-4">

                  {(block.content || []).map((item, i) => (
                    <div
                      key={i}
                      className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-4 space-y-2"
                    >

                      {item.type === "heading" && (
                        <input
                          value={item.text || ""}
                          placeholder="Heading"
                          onChange={(e) => {
                            const updated = [...content];
                            updated[index].content[i].text = e.target.value;
                            setContent(updated);
                          }}
                          className="w-full border border-[var(--border)] p-3 rounded-lg font-bold bg-transparent"
                        />
                      )}

                      {item.type === "subheading" && (
                        <input
                          value={item.text || ""}
                          placeholder="Subheading"
                          onChange={(e) => {
                            const updated = [...content];
                            updated[index].content[i].text = e.target.value;
                            setContent(updated);
                          }}
                          className="w-full border border-[var(--border)] p-3 rounded-lg font-semibold bg-transparent"
                        />
                      )}

                      {item.type === "paragraph" && (
                        <textarea
                          value={item.text || ""}
                          placeholder="Paragraph"
                          onChange={(e) => {
                            const updated = [...content];
                            updated[index].content[i].text = e.target.value;
                            setContent(updated);
                          }}
                          className="w-full border border-[var(--border)] p-3 rounded-lg bg-transparent"
                        />
                      )}

                      {item.type === "bullet" && (
                        <textarea
                          value={(item.items || []).join("\n")}
                          placeholder="One point per line"
                          onChange={(e) => {
                            const updated = [...content];
                            updated[index].content[i].items =
                              e.target.value.split("\n");
                            setContent(updated);
                          }}
                          className="w-full border border-[var(--border)] p-3 rounded-lg bg-transparent"
                        />
                      )}

                      <button
                        type="button"
                        onClick={() => removeInnerBlock(index, i)}
                        className="text-[var(--color-red)] text-xs"
                      >
                        Delete
                      </button>

                    </div>
                  ))}

                  <div className="flex gap-2 flex-wrap">
                    <button type="button" onClick={() => addInnerBlock(index, "heading")}>+ Heading</button>
                    <button type="button" onClick={() => addInnerBlock(index, "subheading")}>+ Subheading</button>
                    <button type="button" onClick={() => addInnerBlock(index, "paragraph")}>+ Paragraph</button>
                    <button type="button" onClick={() => addInnerBlock(index, "bullet")}>+ Bullet</button>
                  </div>

                </div>
              )}

              {block.type === "image" && (
                <input
                  type="file"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const formData = new FormData();
                    formData.append("file", file);

                    const res = await fetch("/api/upload", {
                      method: "POST",
                      body: formData,
                    });

                    const data = await res.json();

                    if (!res.ok) {
                      alert("Upload failed");
                      return;
                    }

                    updateBlock(index, "url", data.url);
                  }}
                />
              )}

              {block.type === "quote" && (
                <textarea
                  value={block.text || ""}
                  onChange={(e) => updateBlock(index, "text", e.target.value)}
                  className="w-full border border-[var(--border)] p-3 rounded-lg bg-transparent"
                />
              )}

            </div>
          ))}

          <div className="flex gap-2">
            <button type="button" onClick={() => addBlock("section")}>+ Section</button>
            <button type="button" onClick={() => addBlock("image")}>+ Image</button>
            <button type="button" onClick={() => addBlock("quote")}>+ Quote</button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || uploading}
          className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg"
        >
          {loading ? "Publishing..." : "Publish"}
        </button>

      </form>
    </main>
  );
}