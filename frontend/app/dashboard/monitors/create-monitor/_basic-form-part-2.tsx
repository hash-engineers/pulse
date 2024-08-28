import { Control } from 'react-hook-form';
import { EFormField } from '@/enums/form';
import { Label } from '@/components/ui/label';
import { nextActions } from '@/lib/array-of-enums/monitor';
import { CustomFormField } from '@/components/form/custom-form-field';

type Props = { control: Control<any> };

export function BasicFormPart2({ control }: Props) {
  return (
    <div className="lg:grid grid-cols-3 gap-x-2">
      <div className="col-span-1">
        <h5 className="text-primary-foreground">On-call escalation</h5>
        <p>
          Set up rules for who&apos;s going to be notified and how when an
          incident occurs.
        </p>
        <p>Notify the entire team as a last resort option.</p>
        <p>Alternatively, set up an advanced escalation policy.</p>
      </div>

      <div className="col-span-2 space-y-6 sm:max-lg:mt-4">
        <div>
          <Label>When there&apos;s a new incident *</Label>
          <div className="flex items-center justify-start flex-wrap gap-x-4">
            <CustomFormField
              fieldType={EFormField.CHECKBOX}
              control={control}
              name="call"
              label="Call"
            />
            <CustomFormField
              fieldType={EFormField.CHECKBOX}
              control={control}
              name="sendSMS"
              label="Send sms"
            />
            <CustomFormField
              fieldType={EFormField.CHECKBOX}
              control={control}
              name="sendEmail"
              label="Send e-mail"
            />
            <CustomFormField
              fieldType={EFormField.CHECKBOX}
              control={control}
              name="pushNotification"
              label="Push notification"
            />
          </div>
        </div>
        <CustomFormField
          fieldType={EFormField.SELECT}
          control={control}
          name="nextAction"
          label="If the on-call person doesn't acknowledge the incident"
          required
          items={nextActions}
        />
      </div>
    </div>
  );
}
