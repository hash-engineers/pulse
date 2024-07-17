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
import { checkBoxFields, whenToAlert } from '@/lib/monitor';

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
              name="url"
              type="url"
              label="URL to monitor"
              required
              placeholder="Ex. https://xyz.com"
            />
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="whenToAlert"
              label="Alert us when"
              required
              whenToAlert={whenToAlert}
            />
            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="whatActionWillTaken"
              label="When there's a new incident"
              checkBoxFields={checkBoxFields}
            />

            <BottomGradientButton>Create</BottomGradientButton>
          </form>
        </Form>
      </div>
    </section>
  );
}
