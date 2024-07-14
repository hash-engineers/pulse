import { Status } from './_status';
import { Actions } from './_actions';

export default function Monitors() {
  return (
    <div className="p-2">
      <Status />
      <Actions />
    </div>
  );
}
