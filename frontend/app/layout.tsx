import './globals.css';
import type { Metadata } from 'next';
import { Kanit as Font } from 'next/font/google';

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
      <body className={font.className}>{children}</body>
    </html>
  );
}
