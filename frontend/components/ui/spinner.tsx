import { Loader2 } from 'lucide-react';

export function Spinner() {
  return (
    <div className="size-full flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
}
