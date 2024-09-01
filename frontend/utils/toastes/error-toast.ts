import { toast } from 'sonner';

type ErrorToast = { error: any };

export function errorToast({ error }: ErrorToast) {
  toast.error(error?.response?.data?.message || 'Something went wrong!');
}
