'use client';

import axios from 'axios';
import { toast } from 'sonner';
import { useState } from 'react';
import { api, headers } from '@/lib/api';
import { useForm } from 'react-hook-form';
import { EFormField } from '@/enums/form';
import { useRouter } from 'next/navigation';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCompanySchema } from '@/schemas/company';
import { CreateCompanyFormData } from '@/types/company';
import { companySize } from '@/lib/array-of-enums/company';
import { CustomFormField } from '@/components/form/custom-form-field';
import { BottomGradientButton } from '@/components/ui/bottom-gradient-button';

type Props = {
  id: string;
  name?: string | null;
  email?: string | null;
};

export function CreateCompanyForm({ id, name, email }: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<CreateCompanyFormData>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      id,
      name: name ?? '',
      email: email ?? '',
      companyName: '',
      size: companySize[0],
    },
  });

  const { push } = useRouter();

  async function onSubmit(data: CreateCompanyFormData) {
    try {
      setLoading(true);

      const res = await axios.post(`${api}/companies`, data, {
        headers,
      });

      if (res) {
        push('/dashboard/monitors/create-monitor');
        form.reset();
        toast.success('Your company created');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
      console.error('The Error From Create Company Form Submit', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-2">
        <CustomFormField
          fieldType={EFormField.INPUT}
          control={form.control}
          name="name"
          type="text"
          label="Your name"
          required
          readOnly={!!name}
          placeholder="Ex. Mehedi Hasan"
        />
        <CustomFormField
          fieldType={EFormField.INPUT}
          control={form.control}
          name="email"
          type="email"
          label="Email"
          required={email ? true : false}
          readOnly={!!email}
          placeholder="Ex. example@gmail.com"
        />
        <CustomFormField
          fieldType={EFormField.INPUT}
          control={form.control}
          name="companyName"
          type="text"
          label="Company name"
          required
          placeholder="Xyz Inc."
        />
        <CustomFormField
          fieldType={EFormField.SELECT}
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
