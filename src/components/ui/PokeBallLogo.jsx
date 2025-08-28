export default function PokeballLogo({ small = false }) {
  return (
    <div className={`relative ${small ? "h-7 w-7" : "h-9 w-9"}`}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white to-zinc-200 border border-black" />
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 bg-black" />
      <div className="absolute inset-0 top-0 rounded-t-full bg-red-600" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3/5 w-3/5 rounded-full bg-white border-2 border-black" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1/4 w-1/4 rounded-full bg-zinc-200 border border-black" />
    </div>
  );
}