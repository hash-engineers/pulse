import { MainForm } from './_main-form';
import { MainInfo } from './_main-info';

export function MainInfoAndForm() {
  return (
    <div className="lg:grid grid-cols-3 gap-x-6 text-muted-foreground">
      <MainInfo />
      <MainForm />
    </div>
  );
}
