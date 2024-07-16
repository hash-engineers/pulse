'use client';

import { z } from 'zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormFieldType } from '@/enums/form';
import { AuthButtons } from '../_auth-buttons';
import { signUpFormSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomFormField } from '@/components/form/custom-form-field';
import { BottomGradientButton } from '@/components/ui/bottom-gradient-button';

export default function SignIn() {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: { email: '', password: '' },
  });

  function onSubmit(data: z.infer<typeof signUpFormSchema>) {
    console.log(data);
  }

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
        <h4 className="font-bold">
          Welcome back to <span className="animate-pulse">Pulse</span>
        </h4>
        <p className="text-muted-foreground text-wrap">
          Login to Pulse if you can because we don&apos;t have a login flow yet
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="my-8 space-y-2"
          >
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              type="email"
              label="Email"
              required
              placeholder="example@gmail.com"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="password"
              type="password"
              label="Your Password"
              required
              placeholder="••••••••"
            />

            <BottomGradientButton>Sign In &rarr;</BottomGradientButton>

            <AuthButtons />

            <p className="text-muted-foreground text-right">
              New here!{' '}
              <Link
                href="/auth/sign-up"
                className="transition duration-300 hover:underline ease-in-out hover:text-primary"
              >
                Sing Up
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </section>
  );
}
