'use client';

import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { EFormField } from '@/enums/form';
import { Form } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { dashboard } from '@/lib/paths/dashboard';
import { createCompany } from '@/actions/company';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCompanySchema } from '@/schemas/company';
import { CreateCompanyFormData } from '@/types/company';
import { errorToast } from '@/utils/toastes/error-toast';
import { companySize } from '@/lib/array-of-enums/company';
import { CustomFormField } from '@/components/form/custom-form-field';
import { BottomGradientButton } from '@/components/ui/bottom-gradient-button';

type Props = {
  id: string;
  name: string;
  email: string | null;
};

export function CreateCompanyForm({ id, name, email }: Props) {
  const { push } = useRouter();

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

  const { mutate: server_createCompany, isPending } = useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      toast.success('Your company created');
      form.reset();
      push(dashboard.monitors.createMonitor.path);
    },
    onError: (error: any) => {
      errorToast({ error });
    },
  });

  function onSubmit(data: CreateCompanyFormData) {
    server_createCompany(data);
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
          required={!!email}
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

        <BottomGradientButton disabled={isPending} loading={isPending}>
          Create
        </BottomGradientButton>
      </form>
    </Form>
  );
}
