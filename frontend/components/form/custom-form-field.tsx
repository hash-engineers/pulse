import { ReactNode } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Control } from 'react-hook-form';
import { FormFieldType } from '@/enums/form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

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
  whenToAlert?: string[];
};

type RenderFieldProps = { field: any; props: CustomFormInputProps };

function RenderField({
  field,
  props: { fieldType, placeholder, type, whenToAlert, label },
}: RenderFieldProps) {
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <FormControl>
          <Input placeholder={placeholder} type={type} {...field} />
        </FormControl>
      );

    case FormFieldType.SELECT:
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select when to alert" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {whenToAlert?.map(item => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case FormFieldType.CHECKBOX:
      return (
        <div className="flex items-center gap-x-2">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel className="cursor-pointer text-muted-foreground checked:text-primary-foreground mt-1">
            {label}
          </FormLabel>
        </div>
      );

    default:
      break;
  }
}

export function CustomFormField(props: CustomFormInputProps) {
  const { control, name, label, required, fieldType } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {fieldType !== FormFieldType.CHECKBOX && (
            <Label htmlFor={name}>
              {label}
              {required && ' *'}
            </Label>
          )}
          <RenderField field={field} props={props} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
