import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';

type Props = { children: React.ReactNode };

export default function HomeLayout({ children }: Props) {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="flex flex-col h-[92vh]">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
