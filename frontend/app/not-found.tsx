import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="border flex w-full h-[80vh] md:h-[60vh] lg:h-[80vh]">
      <div className="flex-1 relative hidden lg:block">
        <Image
          src="/images/404.png"
          alt="404 Not Found Image"
          fill
          className="object-cover pointer-events-none select-none h-full rounded-md"
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <h3>Oops!</h3>
        <p className="text-balance text-center">
          We&apos;re sorry, the page you requested could not be found. Please go
          back to the home page.
        </p>
        <div className="flex items-center gap-x-6 mt-4">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/help">Help</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
