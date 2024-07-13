import { Branding } from './branding';
import { AuthOrUser } from './auth-or-user';
import { NavbarItems } from './navbar-items';

export function Navbar() {
  return (
    <nav className="flex items-center justify-between h-[8vh]">
      <Branding />
      <NavbarItems />
      <AuthOrUser />
    </nav>
  );
}
