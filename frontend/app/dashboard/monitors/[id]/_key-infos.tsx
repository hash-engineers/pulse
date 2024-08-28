import { Monitor } from '@/types/monitor';
import { calculateMonitorCurrentlyUpFor } from '@/helpers/monitor';

type Props = Pick<Monitor, 'incidents' | 'createdAt'>;

export function KeyInfos({ incidents, createdAt }: Props) {
  return (
    <div className="text-muted-foreground grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="border p-4 rounded-md">
        <h6>Currently up for</h6>
        <h3 className="text-foreground">
          {calculateMonitorCurrentlyUpFor({
            monitorCreatedAt: createdAt,
            incidents,
            variant: 'long',
          })}
        </h3>
      </div>
      <div className="border p-4 rounded-md">
        <h6>Last checked at</h6>
        <h3 className="text-foreground">3 minutes</h3>
      </div>
      <div className="border p-4 rounded-md">
        <h6>Incidents</h6>
        <h3 className="text-foreground">{incidents.length}</h3>
      </div>
    </div>
  );
}
