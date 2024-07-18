import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

type Props = { className?: string };

export async function AuthOrDashboard({ className }: Props) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className={cn('hidden md:block', className)}>
      {user ? (
        <Button size="sm" variant="secondary">
          <Link href="/dashboard/monitors">Dashboard</Link>
        </Button>
      ) : (
        <Button asChild size="sm">
          <LoginLink>Sign In</LoginLink>
        </Button>
      )}
    </div>
  );
}
