import { IconBrandGoogle } from '@tabler/icons-react';
import { BottomGradientButton } from '@/components/ui/bottom-gradient-button';

export function AuthButtons() {
  return (
    <>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      <BottomGradientButton>
        <IconBrandGoogle size="16" /> Google
      </BottomGradientButton>
    </>
  );
}
