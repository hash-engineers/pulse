import { Monitor } from '@/types/monitor';
import { getDate } from '@/utils/date-time/get-date';

const { nowTime } = getDate();

export function calculateMonitorAvailability(monitor: Monitor): string {
  const createdAt = new Date(monitor.createdAt);
  const updatedAt = new Date(monitor.updatedAt);

  const totalTime = updatedAt.getTime() - createdAt.getTime();

  if (totalTime <= 0) return '100.0000%';

  const totalDowntime = monitor.incidents.reduce((acc, incident) => {
    const incidentCreatedAt = new Date(incident.createdAt);
    const incidentResolvedAt = new Date(incident?.resolvedAt || nowTime);
    const incidentDowntime =
      incidentResolvedAt.getTime() - incidentCreatedAt.getTime();
    return acc + incidentDowntime;
  }, 0);

  const uptimePercentage = ((totalTime - totalDowntime) / totalTime) * 100;

  return `${uptimePercentage.toFixed(4)}%`;
}
