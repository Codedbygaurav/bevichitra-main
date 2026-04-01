"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Play, X, Image as ImageIcon, Video } from "lucide-react";
import SectionHeader from "../../ui/SectionHeader";
import { projectImages } from "../../../data/projectImages";
import { projectVideos } from "../../../data/projectVideos";

export default function ProjectData() {
  const [filter, setFilter] = useState("image");
  const [playingVideo, setPlayingVideo] = useState(null);
  const router = useRouter();

  /* ================= MERGE ================= */
  const allProjects = [
    ...projectImages.map((p) => ({ ...p, type: "image" })),
    ...projectVideos.map((v) => ({ ...v, type: "video" })),
  ];

  const filtered = allProjects.filter((item) => item.type === filter);

  return (
    <div className="min-h-screen py-28 px-4 md:px-6 section-bg">
      {/* ================= HEADER ================= */}
      <header className="max-w-5xl mx-auto mb-16">
        <SectionHeader
          label="Our Work"
          title={"Work that drives real results"}
          description="A curated selection of projects focused on performance and clarity."
          align="center"
        />
      </header>

      {/* ================= FILTER ================= */}
      <div className="flex justify-center mb-12">
        <div className="flex rounded-full p-1 border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md shadow-[var(--shadow-soft)]">
          {["image", "video"].map((type) => {
            const isActive = filter === type;

            return (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`flex items-center gap-2 px-5 py-2 text-sm rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-[var(--color-blue)] text-white shadow-[var(--shadow-soft)]"
                    : "text-[var(--text-secondary)] "
                }`}
              >
                {type === "image" ? (
                  <>
                    <ImageIcon size={16} />
                    Images
                  </>
                ) : (
                  <>
                    <Video size={16} />
                    Videos
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= GRID ================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((item, index) => (
          <div
            key={index}
            className="group cursor-pointer transition"
          >
            {/* ================= CARD ================= */}
            <div className="relative overflow-hidden rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:border-[var(--color-blue)] transition-all duration-300">
              {/* IMAGE */}
              {item.type === "image" && (
                <div
                  onClick={() => router.push(`/projects/${item.slug}`)}
                  className="relative"
                >
                  <Image
                    src={item.cover}
                    alt={item.title}
                    width={800}
                    height={1000}
                    className="object-cover w-full h-full transition duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              {/* VIDEO */}
              {item.type === "video" && (
                <div className="relative aspect-video">
                  {playingVideo !== item.youtubeId ? (
                    <>
                      <img
                        src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />

                      <button
                        onClick={() => setPlayingVideo(item.youtubeId)}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="w-14 h-14 rounded-full bg-[var(--color-red)] flex items-center justify-center shadow-[var(--shadow-soft)]">
                          <Play size={20} className="text-white" />
                        </div>
                      </button>
                    </>
                  ) : (
                    <div className="absolute inset-0">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />

                      <button
                        onClick={() => setPlayingVideo(null)}
                        className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/70 text-white"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ================= TEXT ================= */}
            <div className="mt-4 px-1">
              <h3 className="text-[var(--text-primary)] font-medium transition group-hover:text-[var(--color-blue)]">
                {item.title || "Project"}
              </h3>

              <p className="text-sm text-[var(--text-secondary)] transition group-hover:text-[var(--color-blue)]">
                {item.type === "video"
                  ? "Watch project →"
                  : "View project →"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}