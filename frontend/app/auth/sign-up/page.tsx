'use client';

import { cn } from '@/lib/utils';
import { FormEvent, ReactNode } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/a-label';
import { IconBrandGoogle } from '@tabler/icons-react';
import { BottomGradientButton } from '@/components/ui/bottom-gradient-button';

type LabelInputContainerProps = {
  children: ReactNode;
  className?: string;
};

function LabelInputContainer({
  children,
  className,
}: LabelInputContainerProps) {
  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  );
}

export default function SignUp() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log('Form submitted');
  }

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
        <h4 className="font-bold">Welcome to Pulse</h4>
        <p className="text-muted-foreground">
          Login to Pulse if you can because we don&apos;t have a login flow yet
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name*</Label>
              <Input id="firstname" placeholder="Mehedi" type="text" />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name*</Label>
              <Input id="lastname" placeholder="Hasan" type="text" />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email address*</Label>
            <Input id="email" placeholder="example@gamil.com" type="email" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password*</Label>
            <Input id="password" placeholder="••••••••" type="password" />
          </LabelInputContainer>

          <BottomGradientButton>Sign Up &rarr;</BottomGradientButton>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <BottomGradientButton>
            <IconBrandGoogle /> Google
          </BottomGradientButton>
        </form>
      </div>
    </section>
  );
}
