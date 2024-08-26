import { Monitor } from '@/types/monitor';

export function calculateAvailability(monitor: Monitor): string {
  const createdAt = new Date(monitor.createdAt);
  const updatedAt = new Date(monitor.updatedAt);

  const totalTime = updatedAt.getTime() - createdAt.getTime();

  const totalDowntime = monitor.incidents.reduce((acc, incident) => {
    const incidentCreatedAt = new Date(incident.createdAt);
    const incidentResolvedAt = new Date(incident.resolvedAt);
    const incidentDowntime =
      incidentResolvedAt.getTime() - incidentCreatedAt.getTime();
    return acc + incidentDowntime;
  }, 0);

  const uptimePercentage = ((totalTime - totalDowntime) / totalTime) * 100;

  return `${uptimePercentage.toFixed(4)}%`;
}
