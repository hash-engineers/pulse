import axios from 'axios';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Monitor } from '@/types/monitor';
import { AllMonitors } from './_all-monitors';
import { Button } from '@/components/ui/button';
import { SearchAndCreateMonitor } from './_search-and-create-monitor';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  let monitors: Monitor[] | null = null;

  if (user?.id) {
    try {
      const res = await axios.get(`${api}/monitors`, {
        data: { userId: user.id },
      });

      monitors = res?.data?.data;
    } catch (error) {
      console.error('Error fetching monitors:', error);
    }
  }

  return (
    <section className="space-y-4">
      {monitors?.length ? (
        <>
          <h3 className="tracking-wide">
            Hey {user!.given_name}, here is your monitors status!
          </h3>
          <SearchAndCreateMonitor />

          <AllMonitors monitors={monitors} />
        </>
      ) : (
        <div className="flex items-center justify-center h-screen w-full">
          <div className="flex flex-col items-center justify-center gap-y-2">
            <h4>Opps, You&apos;ve no monitor yet!</h4>
            <Button asChild variant="link" size="lg">
              <Link href="/dashboard/monitors/create-monitor">Create one</Link>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
