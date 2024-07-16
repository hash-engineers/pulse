import Image from 'next/image';
import { Input } from '../ui/input';
import { Control } from 'react-hook-form';
import { FormFieldType } from '@/enums/form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

type CustomFormInputProps = {
  fieldType: FormFieldType;
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
};

type RenderFieldProps = { field: any; props: CustomFormInputProps };

function RenderField({
  field,
  props: { fieldType, iconSrc, iconAlt, placeholder },
}: RenderFieldProps) {
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt ?? 'icon'}
              height={24}
              width={24}
              className="mt-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );

    default:
      break;
  }
}

export function CustomFormInput(props: CustomFormInputProps) {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
}
