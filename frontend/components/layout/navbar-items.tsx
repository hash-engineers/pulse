'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NAVBAR_ITEMS } from '@/lib/navbar';
import { usePathname } from 'next/navigation';

export function NavbarItems() {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-center gap-x-4 text-muted-foreground h-full">
      {NAVBAR_ITEMS.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className={cn(
            'hover:text-primary-foreground ease-in-out transition duration-300 py-2',
            {
              'text-primary-foreground': pathname.includes(href),
            }
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
