import './globals.css';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import { Kanit as Font } from 'next/font/google';
import { Providers } from '@/providers/providers';

const font = Font({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Pulse',
  description: 'We check website pulse.',
};

type Props = Readonly<{ children: React.ReactNode }>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background antialiased max-w-[1444px] font-sans mx-auto container overflow-x-hidden overflow-y-scroll',
          font.variable
        )}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
