import axios from 'axios';
import { User } from '@/types/user';
import { api, headers } from '@/lib/api';
import { redirect } from 'next/navigation';
import { CreateCompanyForm } from './_create-company-form';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) redirect('/api/auth/login');

  let dbUser: User | null = null;

  try {
    dbUser = (await axios.get(`${api}/users/${user.id}`, { headers })).data
      ?.data;
  } catch (error) {
    console.error('Error From Check Is User  ->', error);
  }

  if (dbUser) redirect('/dashboard/monitors');

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
        <h4 className="font-bold">Create your company</h4>
        <p className="text-muted-foreground text-wrap">
          It is required to handle all monitors and team members.
        </p>
        <CreateCompanyForm
          id={user!.id}
          name={user?.given_name + ' ' + user?.family_name}
          email={user?.email}
        />
      </div>
    </section>
  );
}
