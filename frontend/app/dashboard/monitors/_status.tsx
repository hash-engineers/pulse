import { UptimeBlinking } from '@/components/uptime-blinking';

export function Status() {
  return (
    <div className="flex items-center justify-start gap-x-2 p-2 pl-0">
      <UptimeBlinking />

      <div>
        <h4 className="tracking-wide leading-4">weburl.com/status</h4>
        <p className="text-muted-foreground">
          <span className="text-green-600">Up</span>{' '}
          <span className="font-extrabold">·</span> Checked erery 3 minutes
        </p>
      </div>
    </div>
  );
}
