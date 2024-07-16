'use client';

import Link from 'next/link';
import { useRef } from 'react';
import Image from 'next/image';
import { Div } from '@/lib/motion';
import { products } from '@/lib/home';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FlipWords } from '@/components/ui/flip-words';
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

type ProductCardProps = {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
};

const words1 = ['Ultimate', 'Prevent', 'Stay'];
const words2 = ['uptime', 'downtime', 'relax'];

function Header() {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:pb-40 px-4 w-full left-0 top-0">
      <h1 className="md:text-7xl">
        <FlipWords words={words1} />{' '}
        <FlipWords words={words2} spanClassName="text-primary" /> <br />{' '}
        &quot;Never miss a beat&quot;
      </h1>
      <p className="text-balance text-2xl">
        Ensure your website is always online with real-time monitoring and
        instant alerts.
      </p>
      <Button asChild className="mt-4">
        <Link href="/auth">
          Start in 1 munite <ArrowRightIcon size="16" className="ml-2" />
        </Link>
      </Button>
    </div>
  );
}

function ProductCard({ product, translate }: ProductCardProps) {
  return (
    <Div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl "
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </Div>
  );
}

export function Hero() {
  const ref = useRef(null);
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <section
      ref={ref}
      className="h-[300vh] pt-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <Div style={{ rotateX, rotateZ, translateY, opacity }}>
        <Div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map(product => (
            <ProductCard
              key={product.title}
              product={product}
              translate={translateX}
            />
          ))}
        </Div>
        <Div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map(product => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </Div>
      </Div>
    </section>
  );
}
