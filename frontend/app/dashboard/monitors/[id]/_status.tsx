import { Monitor } from '@/types/monitor';
import { UptimeBlinking } from '@/components/blinks/uptime-blinking';

type Props = Pick<Monitor, 'name' | 'url' | 'status'>;

export function Status({ name, url, status }: Props) {
  return (
    <div className="flex items-center justify-start gap-x-2 p-2 pl-0">
      <UptimeBlinking />

      <div>
        <h4 className="tracking-wide leading-4">{name ?? url}</h4>
        <p className="text-muted-foreground">
          <span className="text-green-600">
            {status.slice(0, 1) + status.slice(1, status.length).toLowerCase()}
          </span>{' '}
          <span className="font-extrabold">·</span> Checked erery 3 minutes
        </p>
      </div>
    </div>
  );
}
