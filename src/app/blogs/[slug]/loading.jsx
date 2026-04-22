export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="animate-pulse space-y-6">
        
        {/* Title */}
        <div className="h-10 w-3/4 rounded-xl bg-[var(--border)]"></div>

        {/* Author / meta */}
        <div className="h-4 w-1/3 rounded bg-[var(--border)]"></div>

        {/* Image */}
        <div className="h-64 w-full rounded-2xl bg-[var(--border)]"></div>

        {/* Paragraphs */}
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-[var(--border)]"></div>
          <div className="h-4 w-full rounded bg-[var(--border)]"></div>
          <div className="h-4 w-5/6 rounded bg-[var(--border)]"></div>
          <div className="h-4 w-4/6 rounded bg-[var(--border)]"></div>
        </div>
      </div>
    </div>
  );
}