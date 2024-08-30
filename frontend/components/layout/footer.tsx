import Link from 'next/link';
import { Branding } from './branding';
import { FooterItems } from './footer-items';
import { FooterSocialIcons } from './footer-social-icons';
import {
  COMMUNITY_ITEMS,
  COMPANY_ITEMS,
  RESOURCES_ITEMS,
  SOLUTIONS_ITEMS,
} from '@/lib/footer';

export function Footer() {
  return (
    <footer className="py-10 my-10 text-muted-foreground px-4">
      <div className="h-[1px] bg-muted mb-8" />

      <div className="flex flex-col items-start">
        <Branding />
        <p className="text-balance">
          Pulse lets you see inside any stack, debug any issue, and resolve any
          incident to help your buseness.
        </p>
      </div>

      <div className="flex justify-between flex-wrap gap-6 mt-6">
        <FooterItems heading="Solutions" items={SOLUTIONS_ITEMS} />
        <FooterItems heading="Resources" items={RESOURCES_ITEMS} />
        <FooterItems heading="Company" items={COMPANY_ITEMS} />
        <FooterItems heading="Community" items={COMMUNITY_ITEMS} />
        <div className="">
          <h4 className="text-primary-foreground">Contact Us</h4>
          <p>+880 1647-706425</p>
          <p>thisismehedihasan0.1@gmail.com</p>
        </div>
      </div>

      <FooterSocialIcons />

      <div className="h-[1px] bg-muted my-8" />

      <div className="flex items-center justify-between">
        <p>&copy; 2024 Pulse. All Rights Reserved.</p>

        <div className="flex items-center justify-center gap-x-4">
          <Link
            href="/home/terms-of-use"
            className="hover:underline hover:text-primary-foreground transition duration-300 ease-in-out"
          >
            Terms of Use
          </Link>
          <Link
            href="/home/privacy-policy"
            className="hover:underline hover:text-primary-foreground transition duration-300 ease-in-out"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
