'use client';

import { z } from 'zod';
import axios from 'axios';
import { toast } from 'sonner';
import { useState } from 'react';
import { api, headers } from '@/lib/api';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { useMonitor } from '@/hooks/monitor';
import { zodResolver } from '@hookform/resolvers/zod';
import { BasicFormPart1 } from './_basic-form-part-1';
import { BasicFormPart2 } from './_basic-form-part-2';
import { createMonitorSchema } from '@/schemas/monitor';
import { whenToAlert, nextActions } from '@/lib/array-of-enums/monitor';
import { BottomGradientButton } from '@/components/ui/bottom-gradient-button';

type Props = { userId: string };

export function MainForm({ userId }: Props) {
  const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { setMonitors } = useMonitor();

  const form = useForm<z.infer<typeof createMonitorSchema>>({
    resolver: zodResolver(createMonitorSchema),
    defaultValues: {
      userId,
      name: '',
      url: '',
      whenToAlert: whenToAlert[0],
      call: false,
      sendSMS: false,
      sendEmail: true,
      pushNotification: false,
      nextAction: nextActions[1],
    },
  });

  async function onSubmit(data: z.infer<typeof createMonitorSchema>) {
    try {
      setLoading(true);

      const res = await axios.post(`${api}/monitors`, data, {
        headers,
      });

      if (res) {
        setMonitors(prev => [...(prev || []), res.data.data]);

        push('/dashboard/monitors');
        form.reset();
        toast.success('Monitor created');
      }
    } catch (error) {
      const err = error as any;

      toast.error(err?.response?.data?.message || 'Something went wrong');
      console.error('The Error From Create Monitor Form Submit ->', error);
    } finally {
      setLoading(false);
    }
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

          <BottomGradientButton disabled={loading} loading={loading}>
            Create
          </BottomGradientButton>
        </form>
      </Form>
    </section>
  );
}
