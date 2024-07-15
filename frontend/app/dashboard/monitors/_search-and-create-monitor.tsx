import Link from 'next/link';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SearchAndCreateMonitor() {
  return (
    <div className="flex items-center justify-start gap-x-8">
      <div className="flex items-center justify-start">
        <Input
          placeholder="Search your monitor"
          className="text-muted-foreground rounded-r-none outline-none"
        />
        <Button size="icon" className="rounded-l-none">
          <Search size="20" />
        </Button>
      </div>

      <Button asChild size="sm">
        <Link href="/dashboard/monitors/create-monitor">Create Monitor</Link>
      </Button>
    </div>
  );
}
