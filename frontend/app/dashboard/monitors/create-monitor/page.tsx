import { MainForm } from './_main-form';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function CreateMonitor() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <section className="space-y-6">
      <h4>Create a new monitor</h4>

      <MainForm userId={user!.id} />
    </section>
  );
}
