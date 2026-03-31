export default function WrapperCard({ children, className = "" }) {
  return (
    <div
      className={`glass rounded-2xl border border-[var(--border-light)] p-6 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}