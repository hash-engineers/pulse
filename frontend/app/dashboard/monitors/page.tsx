import { Status } from './_status';
import { Actions } from './_actions';
import { KeyInfos } from './_key-infos';

export default function Monitors() {
  return (
    <div className="p-2 space-y-4">
      <Status />
      <Actions />
      <KeyInfos />
    </div>
  );
}
