import { Branding } from './branding';
import { OpenNavbar } from './open-navbar';
import { NavbarItems } from './navbar-items';
import { AuthOrDashboard } from './auth-or-dashboard';

export function Navbar() {
  return (
    <nav className="flex items-center justify-between h-[8vh]">
      <Branding />
      <NavbarItems className="hidden lg:flex h-full" />
      <div className="flex items-center justify-center gap-x-2">
        <AuthOrDashboard />
        <OpenNavbar />
      </div>
    </nav>
  );
}
