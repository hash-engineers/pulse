import { Control } from 'react-hook-form';
import { FormFieldType } from '@/enums/form';
import { whenToAlert } from '@/lib/array-of-enums/monitor';
import { CustomFormField } from '@/components/form/custom-form-field';

type Props = { control: Control<any> };

export function BasicFormPart1({ control }: Props) {
  return (
    <div className="lg:grid grid-cols-3 gap-x-2">
      <div className="lg:max-w-sm tracking-wide col-span-1">
        <h5 className="text-primary-foreground">What to monitor</h5>
        <p className="font-light">
          Configure the target website you want to monitor. You&apos;ll find the
          advanced configuration below, in the advanced settings section.
        </p>
      </div>

      <div className="col-span-2 space-y-6 sm:max-lg:mt-4">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="url"
          type="url"
          label="URL to monitor"
          required
          placeholder="Ex. https://xyz.com"
        />
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={control}
          name="whenToAlert"
          label="Alert us when"
          required
          selectPlaceholder="Select when to alert"
          items={whenToAlert}
        />
      </div>
    </div>
  );
}
