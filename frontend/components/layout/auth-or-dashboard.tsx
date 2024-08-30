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
        <div className="space-x-4">
          <Button size="sm" variant="secondary">
            <Link href="/dashboard/monitors">Dashboard</Link>
          </Button>
          <Button size="sm" variant="outline">
            <Link
              rel="noreferrer noopener"
              target="_blank"
              href={process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL!}
            >
              Billing Portal
            </Link>
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
