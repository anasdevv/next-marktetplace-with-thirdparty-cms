import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};
import { Icons } from '@/components/Icons';
import { Button, buttonVariants } from '@/components/ui/button';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] '>
        <div className='flex flex-col items-center space-y-2 text-center'>
          <Icons.logo className='h-20 w-20' />
          <h1 className='text-2xl font-bold'>Sign in to your account</h1>
          <Link
            className={buttonVariants({
              variant: 'link',
              className: 'gap-1.5',
            })}
            href='/sign-up'
          >
            Don&apos;t have an account ? Sign-up
            <ArrowRight className='h-4 w-4' />
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
