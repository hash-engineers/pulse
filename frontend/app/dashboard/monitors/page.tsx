'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { AllMonitors } from './_all-monitors';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { dashboard } from '@/lib/paths/dashboard';
import { getAllMonitors } from '@/actions/monitor';
import { useMutation } from '@tanstack/react-query';
import { errorToast } from '@/utils/toastes/error-toast';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { SearchAndCreateMonitor } from './_search-and-create-monitor';

export default function Page() {
  const { user } = useKindeBrowserClient();

  const {
    data: monitors,
    mutate: server_getAllMonitors,
    isPending,
  } = useMutation({
    mutationFn: getAllMonitors,
    mutationKey: ['monitors'],
    onError: (error: any) => {
      errorToast({ error });
    },
  });

  useEffect(() => {
    if (user?.id) {
      server_getAllMonitors({ userId: user.id });

      const intervalId = setInterval(() => {
        server_getAllMonitors({ userId: user.id });
      }, 1000 * 60 * 3);

      return () => clearInterval(intervalId);
    }
  }, [user, server_getAllMonitors]);

  if (isPending) return <Spinner />;

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
              <Link href={dashboard.monitors.createMonitor.path}>
                Create one
              </Link>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
