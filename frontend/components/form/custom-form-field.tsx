import { ReactNode } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Control } from 'react-hook-form';
import { EFormField } from '@/enums/form';
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
  fieldType: EFormField;
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
  items?: string[];
  readOnly?: boolean;
  selectPlaceholder?: string;
};

type RenderFieldProps = { field: any; props: CustomFormInputProps };

function RenderField({
  field,
  props: {
    fieldType,
    placeholder,
    type,
    items,
    label,
    readOnly,
    selectPlaceholder,
  },
}: RenderFieldProps) {
  switch (fieldType) {
    case EFormField.INPUT:
      return (
        <FormControl>
          <Input
            placeholder={placeholder}
            type={type}
            {...field}
            readOnly={readOnly}
          />
        </FormControl>
      );

    case EFormField.SELECT:
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={selectPlaceholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {items?.map((item: string) => (
              <SelectItem key={item} value={item}>
                {item
                  .replaceAll('_', ' ')
                  .toLowerCase()
                  .replace('minutes', 'minutes,')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case EFormField.CHECKBOX:
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
          {fieldType !== EFormField.CHECKBOX && (
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
