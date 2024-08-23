import axios from 'axios';
import { api } from '@/lib/api';
import { Status } from './_status';
import { Actions } from './_actions';
import { KeyInfos } from './_key-infos';
import { DataTable } from './_data-table';

type Props = { params: { id: string } };

export default async function Monitor({ params: { id } }: Props) {
  const monitor = await axios.get(`${api}/monitors/${id}`);

  return (
    <div className="space-y-4">
      <Status />
      <Actions />
      <KeyInfos />
      <DataTable />
    </div>
  );
}
