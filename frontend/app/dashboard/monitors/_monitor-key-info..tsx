import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Focus } from 'lucide-react';
import { UptimeBlinking } from '@/components/blinks/uptime-blinking';
import { PausedBlinking } from '@/components/blinks/paused-blinking';
import { PendingBlinking } from '@/components/blinks/pending-blinks';
import { DowntimeBlinking } from '@/components/blinks/downtime-blinking';

export type Props = {
  name?: string;
  url: string;
  status: 'Up' | 'Down' | 'Paused' | 'Pending';
  checkingTime: string;
  checkedAt: string;
};

export function MonitorKeyInfo({
  name,
  url,
  status,
  checkingTime,
  checkedAt,
}: Props) {
  return (
    <Link
      href={`/dashboard/monitors/${url}`}
      className="flex items-center justify-between p-2 rounded-md hover:bg-muted-foreground/20 transition duration-300 ease-in-out w-full"
    >
      <div className="flex items-center justify-start gap-x-4">
        {status === 'Up' ? (
          <UptimeBlinking />
        ) : status === 'Down' ? (
          <DowntimeBlinking />
        ) : status === 'Paused' ? (
          <PausedBlinking />
        ) : (
          <PendingBlinking />
        )}

        <div>
          <h5 className="leading-4 tracking-wide">{name || url}</h5>
          <p className="tracking-widest">
            <span
              className={cn({
                'text-green-600': status === 'Up',
                'text-red-600': status === 'Down',
                'text-yellow-600': status === 'Paused',
                'text-gray-600': status === 'Pending',
              })}
            >
              {status}
            </span>{' '}
            <span className="font-extrabold">·</span> {checkedAt}
          </p>
        </div>
      </div>

      <div className="text-muted-foreground flex items-center justify-center gap-x-2">
        <Focus size="20" /> {checkingTime}
      </div>
    </Link>
  );
}
