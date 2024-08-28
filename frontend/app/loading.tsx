import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="py-8 space-y-4">
      <Skeleton className="w-1/2 h-4" />
      <Skeleton className="w-full h-[30vh]" />
      <Skeleton className="w-full h-2" />
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <div className="w-full h-[30vh] space-y-2">
          <Skeleton className="w-full h-[20vh]" />
          <Skeleton className="w-full h-3" />
        </div>
        <div className="w-full h-[30vh] space-y-2">
          <Skeleton className="w-full h-[20vh]" />
          <Skeleton className="w-full h-3" />
        </div>
      </div>
      <Skeleton className="w-full h-[10vh]" />
    </div>
  );
}
