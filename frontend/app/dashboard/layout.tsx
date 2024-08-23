import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { OpenSidebar } from '@/components/layout/open-sidebar';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

type Props = { children: ReactNode };

export default async function DashboardLayout({ children }: Props) {
  const { getUser } = getKindeServerSession();

  if (!(await getUser())) redirect('/home');

  return (
    <div className="relative h-screen">
      <Sidebar />

      <div className="border absolute left-0 lg:left-[210px] top-0 w-full lg:w-[calc(100vw-210px)] h-full pl-4">
        <OpenSidebar />
        {children}
      </div>
    </div>
  );
}
