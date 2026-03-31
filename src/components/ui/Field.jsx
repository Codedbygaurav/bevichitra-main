export default function Field({ label, name, value, onChange, error, textarea }) {
  const base =
    "w-full mt-2 px-4 py-3 rounded-xl border transition outline-none";

  const styles = error
    ? "border-red-500"
    : "border-[var(--border-light)] focus:border-[var(--color-primary)]";

  return (
    <div>
      <label className="text-sm text-[var(--text-secondary)]">
        {label}
      </label>

      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={5}
          className={`${base} ${styles}`}
        />
      ) : (
        <input
          name={name}
          value={value}
          onChange={onChange}
          className={`${base} ${styles}`}
        />
      )}

      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}