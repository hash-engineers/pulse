import { toast } from 'sonner';

type ErrorToast = { error: any };

export function errorToast({ error }: ErrorToast) {
  toast.error(error?.message || 'Something went wrong!');
}
