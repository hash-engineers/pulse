'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { formSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { CustomFormField } from '@/components/form/custom-form-field';
import { FormFieldType } from '@/enums/form';
import { BottomGradientButton } from '@/components/ui/bottom-gradient-button';

export default function InputForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋🏻</h1>
          <p className="text-dark-700">Schedule your first appointment.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          type="email"
          label="Email"
          placeholder="example@gmail.com"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="password"
          type="password"
          label="Your Password"
          placeholder="••••••••"
        />

        <BottomGradientButton>Get Started</BottomGradientButton>
      </form>
    </Form>
  );
}
