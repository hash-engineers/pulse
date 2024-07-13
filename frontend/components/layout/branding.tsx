import Link from 'next/link';

export function Branding() {
  return (
    <div className="flex items-center justify-center text-primary-foreground hover:animate-pulse h-full cursor-pointer">
      <Link href="/" className="flex justify-start">
        <h3>Pulse</h3>
        <div className="size-[10px] bg-green-600 rounded-full animate-pulse border-none outline-none" />
      </Link>
    </div>
  );
}
