import { ReactNode } from 'react';
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
  type?:
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'reset'
    | 'range'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'text'
    | 'url'
    | 'week';
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  children?: ReactNode;
};

type RenderFieldProps = { field: any; props: CustomFormInputProps };

function RenderField({
  field,
  props: { fieldType, placeholder, type },
}: RenderFieldProps) {
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
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

export function CustomFormField(props: CustomFormInputProps) {
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
