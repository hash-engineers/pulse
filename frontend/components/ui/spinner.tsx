import { Loader } from 'lucide-react';

export function Spinner() {
  return (
    <div className="size-full flex items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  );
}
