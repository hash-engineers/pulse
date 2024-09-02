'use client';

import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { CreateAMonitor } from '@/types/monitor';
import { dashboard } from '@/lib/paths/dashboard';
import { createAMonitor } from '@/actions/monitor';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { BasicFormPart1 } from './_basic-form-part-1';
import { BasicFormPart2 } from './_basic-form-part-2';
import { errorToast } from '@/utils/toastes/error-toast';
import { createAMonitorZodSchema } from '@/schemas/monitor';
import { whenToAlert, nextActions } from '@/lib/array-of-enums/monitor';
import { BottomGradientButton } from '@/components/ui/bottom-gradient-button';

type Props = { userId: string };

export function MainForm({ userId }: Props) {
  const { push } = useRouter();

  const form = useForm<CreateAMonitor>({
    resolver: zodResolver(createAMonitorZodSchema),
    defaultValues: {
      userId,
      name: '',
      url: '',
      whenToAlert: whenToAlert[0],
      call: false,
      sendSMS: false,
      sendEmail: true,
      pushNotification: false,
      nextAction: nextActions[2],
    },
  });

  const { mutate: server_createAMonitor, isPending } = useMutation({
    mutationFn: createAMonitor,
    mutationKey: ['monitors'],
    onSuccess: () => {
      push(dashboard.monitors.path);
      form.reset();
      toast.success('Monitor created');
    },
    onError: (error: any) => {
      errorToast({ error });
    },
  });

  function onSubmit(data: CreateAMonitor) {
    server_createAMonitor({ data });
  }

  return (
    <section className="text-muted-foreground">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-8 space-y-10 w-full"
        >
          <BasicFormPart1 control={form.control} />

          <BasicFormPart2 control={form.control} />

          <BottomGradientButton disabled={isPending} loading={isPending}>
            Create
          </BottomGradientButton>
        </form>
      </Form>
    </section>
  );
}
