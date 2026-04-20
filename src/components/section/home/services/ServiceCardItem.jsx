import Image from "next/image";

export default function ServiceCardItem({service}) {
  return (
    <div
      className="
        group relative
        rounded-2xl p-6 md:p-8 mb-5
        transition-all duration-300
        border border-[var(--glass-border)]
        bg-[var(--glass-bg)]
        backdrop-blur-xl
        hover:-translate-y-1
        hover:shadow-[var(--shadow-hover)]
        overflow-hidden
      "
    >
      {/* TOP */}
      <div className="flex justify-between items-start gap-4">
        {/* TITLE */}
        <h3
          className="
            text-xl md:text-2xl font-semibold
            text-[var(--text-primary)]
            transition-colors duration-300
            group-hover:text-[var(--color-blue)]
          "
        >
          {service.title}
        </h3>

        {/* ICON BOX */}
        <div
          className="
            w-11 h-11 flex items-center justify-center rounded-xl
            border border-[var(--glass-border)]
            bg-[var(--bg-secondary)]
            transition-all duration-300
            group-hover:scale-105
            group-hover:shadow-[var(--shadow-soft)]
          "
        >
          <Image
            src={service.icon}
            alt={service.title}
            width={26}
            height={26}
            className={"dark:invert transition-all duration-300"}
          />
        </div>
      </div>

      {/* DESC */}
      <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
        {service.description}
      </p>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2 mt-5">
        {service.tags.map((tag, i) => (
          <span
            key={i}
            className="
              text-xs px-3 py-1 rounded-full
              bg-[var(--bg-secondary)]
              text-[var(--text-secondary)]
              border border-[var(--border)]
              transition-all duration-300
              hover:text-[var(--color-blue)]
              hover:border-[var(--color-blue)]
            "
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
