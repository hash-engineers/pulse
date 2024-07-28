import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

type Props = { className?: string };

export async function AuthOrDashboard({ className }: Props) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className={cn('hidden md:block', className)}>
      {user ? (
        <div className="space-x-4">
          <Button size="sm" variant="secondary">
            <Link href="/dashboard/monitors">Dashboard</Link>
          </Button>
          <Button size="sm" variant="destructive">
            <LogoutLink>Logout</LogoutLink>
          </Button>
        </div>
      ) : (
        <Button asChild size="sm">
          <LoginLink>Sign In</LoginLink>
        </Button>
      )}
    </div>
  );
}
