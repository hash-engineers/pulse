export function UptimeBlinking() {
  return (
    <div className="size-8 relative">
      <div className="absolute top-1/3 left-1/3 animate-pulse bg-teal-400 size-3 rounded-full z-10" />
      <div className="animate-pulse bg-green-700/50 size-8 rounded-full" />
    </div>
  );
}
