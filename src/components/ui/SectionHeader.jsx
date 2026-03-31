import MainBadge from "./MainBadge";

export default function SectionHeader({
  label,
  title,
  description,
  align = "center",
  className = "",
}) {
  const isCenter = align === "center";

  return (
    <header
      className={`max-w-3xl ${
        isCenter ? "mx-auto text-center" : "text-left"
      } ${className}`}
    >
      {/* BADGE */}
      {label && <MainBadge>{label}</MainBadge>}

      {/* TITLE */}
      <h2 className=" text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.15] tracking-tight">
        {Array.isArray(title) ? (
          <>
            <span className="block text-[var(--text-primary)]">
              {title[0]}
            </span>

            <span className="block gradient-text pb-2">
              {title[1]}
            </span>
          </>
        ) : (
          <span className="text-[var(--text-primary)]">
            {title}
          </span>
        )}
      </h2>

      {/* DESCRIPTION */}
      {description && (
        <p
          className={`mt-5 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </header>
  );
}