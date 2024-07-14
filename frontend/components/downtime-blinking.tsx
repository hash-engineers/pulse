export function DowntimeBlinking() {
  return (
    <div className="size-10 relative">
      <div className="absolute top-1/3 left-1/3 animate-pulse bg-red-700 size-3 rounded-full z-10" />
      <div className="animate-pulse bg-rose-400/20 size-full rounded-full" />
    </div>
  );
}
