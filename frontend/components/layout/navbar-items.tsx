'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NavbarItem } from '@/types/layout';
import { NAVBAR_ITEMS } from '@/lib/navbar';
import { usePathname } from 'next/navigation';

type Props = { className?: string; linkClassName?: string };

export function NavbarItems({ className, linkClassName }: Props) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'items-center justify-center gap-x-4 text-muted-foreground',
        className
      )}
    >
      {NAVBAR_ITEMS.map(({ label, href }: NavbarItem) => (
        <Link
          key={label}
          href={href}
          className={cn(
            'hover:text-primary-foreground ease-in-out transition duration-300 py-2',
            {
              'text-primary-foreground': pathname.includes(href),
            },
            linkClassName
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
