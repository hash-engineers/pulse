type GetDateReturn = {
  startOfToday: string;
  startOf7DaysAgo: string;
  startOf30DaysAgo: string;
  startOf365DaysAgo: string;
};

export function getDate(): GetDateReturn {
  const now = new Date();

  const startOfToday = new Date(now);
  startOfToday.setUTCHours(0, 0, 0, 0);

  const startOf7DaysAgo = new Date(now);
  startOf7DaysAgo.setUTCDate(startOf7DaysAgo.getUTCDate() - 7);
  startOf7DaysAgo.setUTCHours(0, 0, 0, 0);

  const startOf30DaysAgo = new Date(now);
  startOf30DaysAgo.setUTCDate(startOf30DaysAgo.getUTCDate() - 30);
  startOf30DaysAgo.setUTCHours(0, 0, 0, 0);

  const startOf365DaysAgo = new Date(now);
  startOf365DaysAgo.setUTCDate(startOf365DaysAgo.getUTCDate() - 365);
  startOf365DaysAgo.setUTCHours(0, 0, 0, 0);

  return {
    startOfToday: startOfToday.toISOString(),
    startOf7DaysAgo: startOf7DaysAgo.toISOString(),
    startOf30DaysAgo: startOf30DaysAgo.toISOString(),
    startOf365DaysAgo: startOf365DaysAgo.toISOString(),
  };
}
