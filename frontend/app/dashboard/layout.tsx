import { Sidebar } from '@/components/layout/sidebar';
import OpenSidebar from '@/components/layout/open-sidebar';

type Props = { children: React.ReactNode };

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="relative h-screen">
      <Sidebar />

      <div className="border absolute left-0 lg:left-[210px] top-0 w-full lg:w-[calc(100vw-210px)] h-full">
        <OpenSidebar />
        {children}
      </div>
    </div>
  );
}
