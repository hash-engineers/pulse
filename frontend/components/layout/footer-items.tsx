import Link from 'next/link';
import { FooterItem } from '@/types/footer';

type Props = { heading: string; items: FooterItem[] };

export function FooterItems({ heading, items }: Props) {
  return (
    <div>
      <h5 className="text-primary-foreground">{heading}</h5>
      <div className="flex flex-col items-start justify-start">
        {items.map(({ label, href }: FooterItem) => (
          <Link
            key={label}
            href={href}
            className="hover:text-primary-foreground transition duration-300 ease-in-out"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
