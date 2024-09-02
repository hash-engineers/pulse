import { ReactNode } from 'react';
import { auth } from '@/lib/paths/auth';
import { redirect } from 'next/navigation';
import { getAnUserById } from '@/actions/user';
import { dashboard } from '@/lib/paths/dashboard';
import { Sidebar } from '@/components/layout/sidebar';
import { OpenSidebar } from '@/components/layout/open-sidebar';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

type Props = { children: ReactNode };

export default async function DashboardLayout({ children }: Props) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) redirect(auth.login.path);

  const dbUser = await getAnUserById({ id: user.id });

  if (!dbUser) redirect(dashboard.companies.createCompany.path);

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
