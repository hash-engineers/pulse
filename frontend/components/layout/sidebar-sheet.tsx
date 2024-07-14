'use client';

import { Menu } from 'lucide-react';
import { Branding } from './branding';
import { SidebarContent } from './sidebar-content';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet';

export default function SidebarSheet() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden flex items-center gap-x-2 text-muted-foreground">
        <Menu className="size-4" /> <span>Menu</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-[300px] lg:hidden">
        <SheetHeader>
          <Branding />
        </SheetHeader>
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
