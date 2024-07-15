import { Menu } from 'lucide-react';
import { NavbarItems } from './navbar-items';
import { AuthOrDashboard } from './auth-or-dashboard';
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from '../ui/sheet';

export function OpenNavbar() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden flex items-center gap-x-2 text-muted-foreground">
        <Menu className="size-4" />
      </SheetTrigger>
      <SheetContent side="top" className="w-full">
        <NavbarItems
          className="flex flex-col items-start"
          linkClassName="w-full hover:bg-muted-foreground/10"
        />
        <SheetFooter>
          <AuthOrDashboard className="block md:max-lg:hidden" />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
