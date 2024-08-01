import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function formatCheckedAt(isoDate: string): string {
  const timestamp = new Date(isoDate);
  const now = new Date();
  const difference = now.getTime() - timestamp.getTime();

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  if (days == 0 && hours === 0 && minutes === 0) return 'now';
  else if (days === 0 && hours === 0) return `${minutes}m`;
  else if (days === 0) return `${hours}h ${minutes}m`;
  else return `${days}d ${hours}h ${minutes}m`;
}

export { cn, formatCheckedAt };
