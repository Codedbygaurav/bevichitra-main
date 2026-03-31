export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-300 w-full lg:w-fit active:scale-[0.96] disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-[2px]";

  const variants = {
    primary: `
      text-white
      bg-[linear-gradient(135deg,var(--color-blue),var(--color-red))]
      shadow-[var(--shadow-soft)]
      hover:shadow-[var(--shadow-hover)]
      hover:scale-[1.02]
    `,

    brand: `
      text-white
      bg-[linear-gradient(135deg,var(--color-blue),var(--color-yellow),var(--color-red))]
      shadow-[var(--shadow-soft)]
      hover:shadow-[var(--shadow-hover)]
      hover:scale-[1.02]
    `,

    warm: `
      text-white
      bg-[linear-gradient(135deg,var(--color-yellow),var(--color-red))]
      shadow-[var(--shadow-soft)]
      hover:shadow-[var(--shadow-hover)]
      hover:scale-[1.02]
    `,

    secondary: `
      text-[var(--text-primary)]
      bg-[var(--bg-elevated)]
      border border-[var(--border)]
      backdrop-blur-md
      hover:border-[var(--color-blue)]
      hover:bg-[var(--bg-secondary)]
      hover:shadow-[var(--shadow-soft)]
    `,

    ghost: `
      text-[var(--text-primary)]
      hover:bg-[var(--bg-elevated)]
      hover:shadow-[var(--shadow-soft)]
    `,

    danger: `
      text-white
      bg-[var(--color-red)]
      shadow-[var(--shadow-soft)]
      hover:shadow-[var(--shadow-hover)]
      hover:scale-[1.02]
    `,
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}