import { Status } from './_status';
import { Actions } from './_actions';
import { KeyInfos } from './_key-infos';
import { DataTable } from './_data-table';

export default function Monitor() {
  return (
    <div className="space-y-4">
      <Status />
      <Actions />
      <KeyInfos />
      <DataTable />
    </div>
  );
}