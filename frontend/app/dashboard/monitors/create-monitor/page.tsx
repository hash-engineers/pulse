import { MainForm } from './_main-form';
import { redirect } from 'next/navigation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) redirect('/api/auth/login');

  return (
    <section className="space-y-6">
      <h4>Create a new monitor</h4>

      <MainForm userId={user.id} />
    </section>
  );
}
