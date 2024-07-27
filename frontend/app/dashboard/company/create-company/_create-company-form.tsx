'use client';

import axios from 'axios';
import { toast } from 'sonner';
import { useState } from 'react';
import { api, headers } from '@/lib/api';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { companySize } from '@/lib/company';
import { Form } from '@/components/ui/form';
import { FormFieldType } from '@/enums/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateCompanyFormData } from '@/types/company';
import { createCompanySchema } from '@/schemas/company';
import { CustomFormField } from '@/components/form/custom-form-field';
import { BottomGradientButton } from '@/components/ui/bottom-gradient-button';
import { Button } from '@/components/ui/button';

type Props = {
  name?: string | null;
  email?: string | null;
};

export function CreateCompanyForm({ name, email }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<CreateCompanyFormData>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: name ?? '',
      email: email ?? '',
      companyName: '',
      size: companySize[0].label,
    },
  });
  const { push } = useRouter();

  async function onSubmit(data: CreateCompanyFormData) {
    try {
      setLoading(true);

      const res = await axios.post(`${api}/company/create-company`, data, {
        headers,
      });

      if (res) {
        push('/dashboard/monitors/create-monitor');
        form.reset();

        toast.success('Your company created');
      }
    } catch (error) {
      toast.error('Something went wrong');

      console.log('The Error From Create Company Form Submit', error);
    } finally {
      setLoading(false);
    }
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
          name="companyName"
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

        <BottomGradientButton disabled={loading} loading={loading}>
          Create
        </BottomGradientButton>
      </form>
    </Form>
  );
}