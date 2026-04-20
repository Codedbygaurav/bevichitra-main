"use client";

import { useRouter } from "next/navigation";

export default function LogOut() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });

      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-[var(--bg-secondary)] text-[var(--text-primary)] px-3 py-2 rounded-lg hover:bg-gray-600 hover:text-white transition"
    >
      Logout
    </button>
  );
}