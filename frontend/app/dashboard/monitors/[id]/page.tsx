import axios from 'axios';
import { api } from '@/lib/api';
import { Status } from './_status';
import { Actions } from './_actions';
import { KeyInfos } from './_key-infos';
import { DataTable } from './_data-table';
import { Monitor } from '@/types/monitor';

type Props = { params: { id: string } };

export default async function MonitorDetails({ params: { id } }: Props) {
  let monitor: Monitor | null = null;

  try {
    monitor = (await axios.get(`${api}/monitors/${id}`)).data.data;
  } catch (error) {
    console.error('Error From Fetch Monitor Data ->', error);
  }

  if (!monitor) return null;

  return (
    <section className="space-y-4 pt-12">
      <Status name={monitor.name} url={monitor.url} status={monitor.status} />
      <Actions />
      <KeyInfos incidents={monitor.incidents} />
      <DataTable />
    </section>
  );
}
