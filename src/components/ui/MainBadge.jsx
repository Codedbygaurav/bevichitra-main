export default function MainBadge({
  children,
  className = "",
}) {
  return (
    <span
      className={`
        inline-flex items-center
        mb-4
        px-4 py-1.5
        text-sm font-medium tracking-wide
        text-[var(--text-secondary)]
        bg-[var(--bg-secondary)]
        rounded-full
        border border-[var(--border)]
        ${className}
      `}
    >
      {children}
    </span>
  );
}