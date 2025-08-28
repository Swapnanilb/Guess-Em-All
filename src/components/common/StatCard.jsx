export default function StatCard({ label, value, note }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
      <div className="text-white/70 text-xs">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
      {note && <div className="text-[11px] text-white/50 mt-1">{note}</div>}
    </div>
  );
}