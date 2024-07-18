'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { companySize } from '@/lib/company';
import { Form } from '@/components/ui/form';
import { FormFieldType } from '@/enums/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCompanySchema } from '@/schemas/company';
import { CustomFormField } from '@/components/form/custom-form-field';
import { BottomGradientButton } from '@/components/ui/bottom-gradient-button';

type Props = { name?: string | null; email?: string | null };

export function CreateCompanyForm({ name, email }: Props) {
  const form = useForm<z.infer<typeof createCompanySchema>>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: name ?? '',
      email: email ?? '',
      company: '',
      size: companySize[0].label,
    },
  });

  function onSubmit(data: z.infer<typeof createCompanySchema>) {
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
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="size"
          label="Company size"
          required
          selectPlaceholder="Select the compnay size"
          items={companySize}
        />

        <BottomGradientButton>Create</BottomGradientButton>
      </form>
    </Form>
  );
}
