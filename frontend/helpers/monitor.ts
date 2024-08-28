import { Monitor } from '@/types/monitor';
import { Incident } from '@/types/incident';

type CalculateMonitorCurrentlyUpFor = {
  monitorCreatedAt: string;
  incidents: Pick<Incident, 'createdAt' | 'resolvedAt'>[];
  variant?: 'short' | 'long';
};

const now = new Date();

export function calculateMonitorAvailability(
  monitor: Monitor,
  startDate: string
): string {
  const createdAt = new Date(
    Math.max(
      new Date(monitor.createdAt).getTime(),
      new Date(startDate).getTime()
    )
  );
  const updatedAt = new Date(monitor.updatedAt);

  const totalTime = updatedAt.getTime() - createdAt.getTime();

  if (totalTime <= 0) return '100.0000%';

  const totalDowntime = monitor.incidents.reduce((acc, incident) => {
    const incidentCreatedAt = new Date(incident.createdAt);
    const incidentResolvedAt = incident.resolvedAt
      ? new Date(incident.resolvedAt)
      : updatedAt;

    const effectiveIncidentStart = new Date(
      Math.max(incidentCreatedAt.getTime(), createdAt.getTime())
    );
    const effectiveIncidentEnd = new Date(
      Math.min(incidentResolvedAt.getTime(), updatedAt.getTime())
    );

    if (effectiveIncidentStart < effectiveIncidentEnd) {
      const incidentDowntime =
        effectiveIncidentEnd.getTime() - effectiveIncidentStart.getTime();
      return acc + incidentDowntime;
    }

    return acc;
  }, 0);

  const uptimePercentage = ((totalTime - totalDowntime) / totalTime) * 100;

  return `${uptimePercentage.toFixed(4)}%`;
}

export function calculateMonitorCurrentlyUpFor({
  monitorCreatedAt,
  incidents,
  variant = 'short',
}: CalculateMonitorCurrentlyUpFor): string {
  const monitorCreationTime = new Date(monitorCreatedAt);

  let uptime = now.getTime() - monitorCreationTime.getTime();

  if (incidents) {
    incidents.forEach(incident => {
      const incidentStartTime = new Date(incident.createdAt).getTime();
      const incidentEndTime = incident.resolvedAt
        ? new Date(incident.resolvedAt).getTime()
        : now.getTime();

      uptime -= incidentEndTime - incidentStartTime;
    });
  }

  const years = Math.floor(uptime / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(
    (uptime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
  );
  const days = Math.floor(
    (uptime % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
  );
  const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));

  const yearsString =
    variant === 'short' ? 'y' : years === 1 ? ' year' : ' years';
  const monthsString =
    variant === 'short' ? 'mo' : months === 1 ? ' month' : ' months';
  const daysString = variant === 'short' ? 'd' : days === 1 ? ' day' : ' days';
  const hoursString =
    variant === 'short' ? 'h' : hours === 1 ? ' hour' : ' hours';
  const minutesString =
    variant === 'short' ? 'm' : minutes === 1 ? ' minute' : ' minutes';

  if (years > 0)
    return `${
      years +
      yearsString +
      ' ' +
      months +
      monthsString +
      ' ' +
      days +
      daysString
    }`;
  if (months > 0)
    return `${
      months +
      monthsString +
      ' ' +
      days +
      daysString +
      ' ' +
      hours +
      hoursString
    }`;
  if (days > 0)
    return `${
      days +
      daysString +
      ' ' +
      hours +
      hoursString +
      ' ' +
      minutes +
      minutesString
    }`;
  if (hours > 0)
    return `${hours + hoursString + ' ' + minutes + minutesString}`;
  if (minutes > 0) return `${minutes + minutesString}`;

  return 'now';
}
