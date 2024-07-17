'use client';

import { z } from 'zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormFieldType } from '@/enums/form';
import { signInFormSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomFormField } from '@/components/form/custom-form-field';
import { BottomGradientButton } from '@/components/ui/bottom-gradient-button';

export function MainForm() {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: { name: '', email: '', company: '', size: '', password: '' },
  });

  function onSubmit(data: z.infer<typeof signInFormSchema>) {
    console.log(data);
  }

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
        <h4 className="font-bold">
          Welcome to <span className="animate-pulse">Pulse</span>
        </h4>
        <p className="text-muted-foreground text-wrap">
          Login to Pulse if you can because we don&apos;t have a login flow yet
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-2"
          >
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              type="text"
              label="Your name"
              required
              placeholder="Ex. Mehedi Hasan"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              type="email"
              label="Email"
              required
              placeholder="Ex. example@gmail.com"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="company"
              type="text"
              label="Company name"
              required
              placeholder="Xyz Inc."
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="size"
              type="text"
              label="Company size"
              required
              placeholder="Ex. 1 - 5"
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

            <BottomGradientButton>Sign Up &rarr;</BottomGradientButton>

            <p className="text-muted-foreground text-right">
              Have an account!{' '}
              <Link
                href="/auth/sign-in"
                className="transition duration-300 hover:underline ease-in-out hover:text-primary"
              >
                Sing In
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </section>
  );
}
