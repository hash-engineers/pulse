function differenceBetweenTwoTimestamps(
  startDateString: string,
  endDateString: string
): string {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();
  let hours = endDate.getHours() - startDate.getHours();
  let minutes = endDate.getMinutes() - startDate.getMinutes();
  let seconds = endDate.getSeconds() - startDate.getSeconds();

  // Adjust for negative values
  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    const previousMonth = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      0
    ).getDate();
    days += previousMonth;
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  return `${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
}
