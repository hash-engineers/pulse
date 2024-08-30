'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { SidebarItem } from '@/types/layout';
import { SIDEBAR_ITEMS } from '@/lib/sidebar';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '../ui/button';
import { DollarSign, LogOutIcon } from 'lucide-react';

export function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col">
        {SIDEBAR_ITEMS.map(({ icon: Icon, label, href }: SidebarItem) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'text-sm text-muted-foreground flex items-center gap-x-2 py-2 rounded-md pl-2 transition duration-300 hover:bg-muted-foreground/10',
              { 'bg-muted-foreground/10': pathname.includes(href) }
            )}
          >
            <Icon size="16" /> {label}
          </Link>
        ))}
      </div>

      <div className="space-y-2">
        <Link
          href="/dashboard/pricing"
          className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
        >
          <DollarSign size={18} className="mr-2" /> Pricing
        </Link>
        <Link
          href="/api/auth/logout"
          className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
        >
          <LogOutIcon size={18} className="mr-2" /> Logout
        </Link>
      </div>
    </div>
  );
}
