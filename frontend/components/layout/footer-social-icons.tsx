import Image from 'next/image';
import { FooterSocialIcon } from '@/types/layout';
import { FOOTER_SOCIAL_ICONS } from '@/lib/footer';

export function FooterSocialIcons() {
  return (
    <div className="flex items-center justify-center gap-x-4 mt-6">
      <h4 className="text-primary-foreground">Follow Us</h4>

      <div className="flex gap-x-6">
        {FOOTER_SOCIAL_ICONS.map(({ src, href }: FooterSocialIcon) => (
          <a key={src} href={href}>
            <Image
              src={`/images/social/${src}.png`}
              alt="Social Icon"
              height={28}
              width={28}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
