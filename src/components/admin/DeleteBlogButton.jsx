"use client";

export default function DeleteBlogButton({ slug }) {
  const handleDelete = async () => {
    const confirmDelete = confirm("Delete this blog?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/blogs/${slug}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Delete failed");

      location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 text-sm"
    >
      Delete
    </button>
  );
}