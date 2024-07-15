import { Branding } from './branding';
import { SidebarContent } from './sidebar-content';

export function Sidebar() {
  return (
    <div className="hidden w-[200px] fixed h-full lg:flex items-start bg-secondary pl-2 pt-2">
      <div className="w-full">
        <Branding />
        <div className="h-[1px] bg-muted-foreground my-2 w-full" />
        <SidebarContent />
      </div>
    </div>
  );
}
