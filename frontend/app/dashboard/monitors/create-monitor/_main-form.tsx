'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormFieldType } from '@/enums/form';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMonitorSchema } from '@/schemas/monitor';
import { whenDoesNotAcknowledge, whenToAlert } from '@/lib/monitor';
import { CustomFormField } from '@/components/form/custom-form-field';
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
      whenDoesNotAcknowledge: whenDoesNotAcknowledge[2],
    },
  });

  function onSubmit(data: z.infer<typeof createMonitorSchema>) {
    console.log(data);
  }

  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-8 space-y-10 w-full"
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
          <div>
            <Label>When there&apos;s a new inciden</Label>
            <div className="flex items-center justify-start flex-wrap gap-x-4">
              <CustomFormField
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="call"
                label="Call"
              />
              <CustomFormField
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="sendSMS"
                label="Send sms"
              />
              <CustomFormField
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="sendEmail"
                label="Send e-mail"
              />
              <CustomFormField
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="pushNotification"
                label="Push notification"
              />
            </div>
          </div>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="whenDoesNotAcknowledge"
            label="If the on-call person doesn't acknowledge the incident"
            required
            whenToAlert={whenDoesNotAcknowledge}
          />

          <BottomGradientButton>Create</BottomGradientButton>
        </form>
      </Form>
    </section>
  );
}
