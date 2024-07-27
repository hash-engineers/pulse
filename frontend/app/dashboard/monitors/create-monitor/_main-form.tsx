'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BasicFormPart1 } from './_basic-form-part-1';
import { BasicFormPart2 } from './_basic-form-part-2';
import { createMonitorSchema } from '@/schemas/monitor';
import { whenToAlert, nextActions } from '@/lib/array-of-enums/monitor';
import { BottomGradientButton } from '@/components/ui/bottom-gradient-button';

export function MainForm() {
  const form = useForm<z.infer<typeof createMonitorSchema>>({
    resolver: zodResolver(createMonitorSchema),
    defaultValues: {
      url: '',
      whenToAlert: whenToAlert[0],
      call: false,
      sendSMS: false,
      sendEmail: true,
      pushNotification: false,
      whenDoesNotAcknowledge: nextActions[2],
    },
  });

  function onSubmit(data: z.infer<typeof createMonitorSchema>) {
    console.log(data);
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

          <BottomGradientButton className="tracking-widest">
            Create
          </BottomGradientButton>
        </form>
      </Form>
    </section>
  );
}
