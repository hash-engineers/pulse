import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Focus } from 'lucide-react';
import { Monitor } from '@/types/monitor';
import { calculateMonitorCurrentlyUpFor } from '@/helpers/monitor';
import { UptimeBlinking } from '@/components/blinks/uptime-blinking';
import { PausedBlinking } from '@/components/blinks/paused-blinking';
import { PendingBlinking } from '@/components/blinks/pending-blinking';
import { DowntimeBlinking } from '@/components/blinks/downtime-blinking';

type Props = Pick<Monitor, 'id' | 'name' | 'url' | 'status' | 'createdAt'> & {
  checkingTime: string;
};

export function MonitorKeyInfo({
  id,
  name,
  url,
  status,
  checkingTime,
  createdAt,
}: Props) {
  return (
    <Link
      href={`/dashboard/monitors/${id}`}
      className="flex items-center justify-between p-2 rounded-md hover:bg-muted-foreground/20 transition duration-300 ease-in-out w-full"
    >
      <div className="flex items-center justify-start gap-x-4">
        {status === 'UP' ? (
          <UptimeBlinking />
        ) : status === 'DOWN' ? (
          <DowntimeBlinking />
        ) : status === 'PAUSED' ? (
          <PausedBlinking />
        ) : (
          <PendingBlinking />
        )}

        <div className="max-sm:max-w-48 sm:max-lg:max-w-xs xl:max-w-2xl">
          <h5 className="leading-4 tracking-wide truncate">{name || url}</h5>
          <p className="tracking-widest">
            <span
              className={cn({
                'text-green-600': status === 'UP',
                'text-red-600': status === 'DOWN',
                'text-yellow-600': status === 'PAUSED',
                'text-gray-600': status === 'PENDING',
              })}
            >
              {status.charAt(0) + status.slice(1, status.length).toLowerCase()}
            </span>{' '}
            <span className="font-extrabold">·</span>{' '}
            {calculateMonitorCurrentlyUpFor(createdAt, 'short')}
          </p>
        </div>
      </div>

      <div className="text-muted-foreground flex items-center justify-center gap-x-2">
        <Focus size="20" /> {checkingTime}
      </div>
    </Link>
  );
}
