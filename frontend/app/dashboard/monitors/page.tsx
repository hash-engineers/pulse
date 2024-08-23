import { AllMonitors } from './_all-monitors';
import { SearchAndCreateMonitor } from './_search-and-create-monitor';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function Monitors() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <section className="space-y-4">
      <h3 className="tracking-wide">
        Hey {user!.given_name}, here is your monitors status!
      </h3>
      <SearchAndCreateMonitor />

      <AllMonitors userId={user!.id} />
    </section>
  );
}
