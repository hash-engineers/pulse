import { DowntimeBlinking } from '@/components/downtime-blinking';
import { UptimeBlinking } from '@/components/uptime-blinking';

export function Status() {
  return (
    <div>
      <UptimeBlinking />
      <DowntimeBlinking />
    </div>
  );
}
