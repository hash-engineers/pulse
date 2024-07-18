'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormFieldType } from '@/enums/form';
import { signInFormSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomFormField } from '@/components/form/custom-form-field';
import { BottomGradientButton } from '@/components/ui/bottom-gradient-button';

type Props = { name?: string | null; email?: string | null };

export function CreateCompanyForm({ name, email }: Props) {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      name: name ?? '',
      email: email ?? '',
      company: '',
      size: '',
      password: '',
    },
  });

  function onSubmit(data: z.infer<typeof signInFormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-2">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          type="text"
          label="Your name"
          required
          readOnly={name ? true : false}
          placeholder="Ex. Mehedi Hasan"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          type="email"
          label="Email"
          required={email ? true : false}
          readOnly
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

        <BottomGradientButton>Create</BottomGradientButton>
      </form>
    </Form>
  );
}
