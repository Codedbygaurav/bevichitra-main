"use client";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { calculateReadingTime } from "@/lib/utils/readingTIme"; 

function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children({ attributes, listeners })}
    </div>
  );
}

export default function EditBlogForm({ blog }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: blog.title || "",
    slug: blog.slug || "",
    excerpt: blog.excerpt || "",
    category: blog.category || "",
    author: blog.author || "rahul",
    tags: blog.tags ? blog.tags.join(", ") : "",
    coverImage: blog.coverImage || "",
  });

  const [content, setContent] = useState(blog.content || []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setContent((items) => arrayMove(items, active.id, over.id));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.slug) {
      alert("Title and slug required");
      return;
    }

    if (content.length === 0) {
      alert("Content cannot be empty");
      return;
    }

    try {
      setLoading(true);

      const readTime = calculateReadingTime(content);

      const res = await fetch(`/api/blogs/${blog._id}`, {
        method: "PUT",
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

      if (!res.ok) throw new Error(data.error || "Update failed");

      router.push("/admin");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto py-16 mt-20 px-6 space-y-10 bg-[var(--bg-main)] text-[var(--text-primary)]">
      <h1 className="text-4xl font-bold">Edit Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-10">

        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-6 space-y-5">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border border-[var(--border)] p-3 rounded-lg bg-transparent"
          />

          <input
            value={form.slug}
            readOnly
            className="w-full border border-[var(--border)] p-3 rounded-lg bg-[var(--bg-secondary)]"
          />

          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            placeholder="Excerpt"
            className="w-full border border-[var(--border)] p-3 rounded-lg bg-transparent"
          />
        </div>

        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-semibold">Content Builder</h2>

          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={content.map((_, i) => i)}
              strategy={verticalListSortingStrategy}
            >
              {content.map((block, index) => (
                <SortableItem key={index} id={index}>
                  {({ attributes, listeners }) => (
                    <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-5 space-y-4">

                      <div className="flex justify-between items-center">
                        <div {...attributes} {...listeners} className="cursor-grab">⋮⋮</div>
                        <span className="text-xs text-[var(--text-secondary)]">{block.type}</span>
                        <button
                          type="button"
                          onClick={() => removeBlock(index)}
                          className="text-[var(--color-red)]"
                        >
                          Delete
                        </button>
                      </div>

                      {block.type === "section" && (
                        <div className="space-y-3">

                          {(block.content || []).map((item, i) => (
                            <div key={i} className="border border-[var(--border)] p-3 rounded">

                              {item.type === "heading" && (
                                <input
                                  value={item.text || ""}
                                  placeholder="Heading"
                                  onChange={(e) => {
                                    const updated = [...content];
                                    updated[index].content[i].text = e.target.value;
                                    setContent(updated);
                                  }}
                                  className="w-full border border-[var(--border)] p-2 font-bold bg-transparent"
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
                                  className="w-full border border-[var(--border)] p-2 font-semibold bg-transparent"
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
                                  className="w-full border border-[var(--border)] p-2 bg-transparent"
                                />
                              )}

                              {item.type === "bullet" && (
                                <textarea
                                  value={(item.items || []).join("\n")}
                                  placeholder="One point per line"
                                  onChange={(e) => {
                                    const updated = [...content];
                                    updated[index].content[i].items = e.target.value.split("\n");
                                    setContent(updated);
                                  }}
                                  className="w-full border border-[var(--border)] p-2 bg-transparent"
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

                      {block.type === "image" && <input type="file" />}

                      {block.type === "quote" && (
                        <textarea
                          value={block.text || ""}
                          onChange={(e) => updateBlock(index, "text", e.target.value)}
                          className="w-full border border-[var(--border)] p-2 bg-transparent"
                        />
                      )}

                    </div>
                  )}
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>

          <div className="flex gap-3">
            <button type="button" onClick={() => addBlock("section")}>+ Section</button>
            <button type="button" onClick={() => addBlock("image")}>+ Image</button>
            <button type="button" onClick={() => addBlock("quote")}>+ Quote</button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg"
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>

      </form>
    </main>
  );
}