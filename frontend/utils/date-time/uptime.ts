import { Monitor } from '@/types/monitor';
import { Incident } from '@/types/incident';

function calculateUptimePercentage(monitor: Monitor): string {
  const createdAt = new Date(monitor.createdAt);
  const updatedAt = new Date(monitor.updatedAt);

  const totalTime = updatedAt.getTime() - createdAt.getTime();

  const totalDowntime = monitor.incidents.reduce((acc, incident: Incident) => {
    const incidentCreatedAt = new Date(incident.createdAt);
    const incidentResolvedAt = new Date(incident.resolvedAt);
    const incidentDowntime =
      incidentResolvedAt.getTime() - incidentCreatedAt.getTime();
    return acc + incidentDowntime;
  }, 0);

  const uptimePercentage = ((totalTime - totalDowntime) / totalTime) * 100;

  return `${uptimePercentage.toFixed(4)}%`;
}
