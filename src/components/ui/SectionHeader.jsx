import MainBadge from "./MainBadge";

export default function SectionHeader({
  label,
  title,
  description,
  align = "center",
  className = "",
}) {
  const desktopAlignment =
    align === "center" ? "md:text-center md:mx-auto" : "md:text-left";

  return (
    <header
      className={`max-w-3xl text-center ${desktopAlignment} ${className}`}
    >
      {label && (
        <div className="flex justify-center">
          <MainBadge>{label}</MainBadge>
        </div>
      )}

      <h2 className="mt-4 text-4xl md:text-5xl font-semibold leading-[1.08] tracking-tight text-[var(--text-primary)]">
        {title}
      </h2>

      {description && (
        <p
          className={`mt-5 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto ${
            align === "left" ? "md:mx-0" : ""
          }`}
        >
          {description}
        </p>
      )}
    </header>
  );
}