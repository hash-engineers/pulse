import { CreateCompanyForm } from './_create-company-form';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function SignUp() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
        <h4 className="font-bold">
          Welcome to <span className="animate-pulse">Pulse</span>
        </h4>
        <p className="text-muted-foreground text-wrap">
          Login to Pulse if you can because we don&apos;t have a login flow yet
        </p>
        <CreateCompanyForm
          name={user?.given_name + ' ' + user?.family_name}
          email={user?.email}
        />
      </div>
    </section>
  );
}
