import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

type BottomGradientButtonProps = {
  children: ReactNode;
  type?: 'submit';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

function BottomGradient() {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
}

export function BottomGradientButton({
  children,
  type = 'submit',
  className,
  onClick,
  disabled = false,
  loading = false,
}: BottomGradientButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] disabled:opacity-50 disabled:cursor-not-allowed tracking-wider',
        className,
        { 'text-muted-foreground': disabled }
      )}
      type={type}
    >
      <span className="flex items-center justify-center gap-x-2">
        {children}{' '}
        {loading && <Loader2 size="16" className="animate-spin size-4" />}
      </span>
      <BottomGradient />
    </button>
  );
}
