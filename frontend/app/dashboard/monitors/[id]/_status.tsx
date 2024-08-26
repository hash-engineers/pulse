import { cn } from '@/lib/utils';
import { Monitor } from '@/types/monitor';
import { EMonitorStatus } from '@/enums/monitor';
import { UptimeBlinking } from '@/components/blinks/uptime-blinking';
import { PausedBlinking } from '@/components/blinks/paused-blinking';
import { PendingBlinking } from '@/components/blinks/pending-blinking';
import { DowntimeBlinking } from '@/components/blinks/downtime-blinking';

type Props = Pick<Monitor, 'name' | 'url' | 'status'>;

export function Status({ name, url, status }: Props) {
  return (
    <div className="flex items-center justify-start gap-x-2 p-2 pl-0">
      {status === EMonitorStatus.PENDING ? (
        <PendingBlinking />
      ) : status === EMonitorStatus.UP ? (
        <UptimeBlinking />
      ) : status === EMonitorStatus.PAUSED ? (
        <PausedBlinking />
      ) : (
        <DowntimeBlinking />
      )}

      <div>
        <h4 className="tracking-wide leading-4">{name ?? url}</h4>
        <p className="text-muted-foreground">
          <span
            className={cn({
              'text-gray-500': status === EMonitorStatus.PENDING,
              'text-green-600': status === EMonitorStatus.UP,
              'text-yellow-600': status === EMonitorStatus.PAUSED,
              'text-red-600': status === EMonitorStatus.DOWN,
            })}
          >
            {status.slice(0, 1) + status.slice(1, status.length).toLowerCase()}
          </span>{' '}
          <span className="font-extrabold">·</span> Checked erery 3 minutes
        </p>
      </div>
    </div>
  );
}
