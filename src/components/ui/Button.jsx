export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "relative inline-flex items-center justify-center px-4 py-2 rounded-xl font-medium w-full lg:w-fit overflow-hidden transition-all duration-200 active:scale-[0.96] disabled:opacity-40 disabled:cursor-not-allowed font-[var(--font-heading)]";

  const variants = {
    primary: `
      text-white
      bg-[var(--color-yellow)]
      hover:bg-[#e6b800]
    `,
    secondary: `
  text-[var(--text-primary)]
  border border-[var(--glass-border)]
  bg-[var(--bg-elevated)]
  backdrop-blur-md
  rounded-xl

  shadow-[0_4px_14px_rgba(0,0,0,0.08)]

  hover:border-[var(--color-yellow)]
  hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]
  hover:-translate-y-[1px]

  transition-all duration-200
`,
ghost: `
  text-[var(--text-primary)]
  px-4 py-2
  rounded-lg
  hover:bg-[var(--bg-elevated)]
  transition-all duration-200
`,
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
