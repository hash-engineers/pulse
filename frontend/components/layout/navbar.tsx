import Link from 'next/link';
import { AuthOrUser } from './auth-or-user';
import { NavbarItems } from './navbar-items';

export function Navbar() {
  return (
    <div className="flex items-center justify-between h-[8vh]">
      <div className="flex items-center justify-center text-primary-foreground hover:animate-pulse h-full cursor-pointer">
        <Link href="/" className="flex justify-start">
          <h3>Pulse</h3>
          <div className="size-[10px] bg-green-600 rounded-full animate-pulse border-none outline-none" />
        </Link>
      </div>

      <NavbarItems />

      <AuthOrUser />
    </div>
  );
}
