'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-y-4">
        <h3 className="text-destructive-foreground">Something went wrong!</h3>

        <div className="flex items-center justify-center gap-x-6">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/feedback">Feedback</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
