import { Sidebar } from '@/components/layout/sidebar';
import SidebarSheet from '@/components/layout/sidebar-sheet';

type Props = { children: React.ReactNode };

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="relative h-screen">
      <Sidebar />

      <div className="border absolute left-0 lg:left-[210px] top-0 w-full lg:w-[calc(100vw-210px)] h-full">
        <SidebarSheet />
        {children}
      </div>
    </div>
  );
}
