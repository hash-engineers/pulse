import { ReactNode } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Control } from 'react-hook-form';
import { FormFieldType } from '@/enums/form';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';

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
  required?: boolean;
};

type RenderFieldProps = { field: any; props: CustomFormInputProps };

function RenderField({
  field,
  props: { fieldType, placeholder, type },
}: RenderFieldProps) {
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <FormControl>
          <Input placeholder={placeholder} type={type} {...field} />
        </FormControl>
      );

    default:
      break;
  }
}

export function CustomFormField(props: CustomFormInputProps) {
  const { control, name, label, required } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Label htmlFor={name}>
            {label}
            {required && ' *'}
          </Label>
          <RenderField field={field} props={props} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
