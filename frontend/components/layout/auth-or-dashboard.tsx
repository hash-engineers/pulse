import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

type Props = { className?: string };

export function AuthOrDashboard({ className }: Props) {
  const user = false; // LATTER: IT WILL COME FROM DB

  return (
    <div className={cn('hidden md:block', className)}>
      {user ? (
        <Button size="sm" variant="secondary">
          Dashboard
        </Button>
      ) : (
        <Button size="sm">Sign In</Button>
      )}
    </div>
  );
}
