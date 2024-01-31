'use client';
import { trpc } from '@/trpc/client';
import { Loader2, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { buttonVariants } from './ui/button';

interface VerifyEmailProps {
  token: string;
}
const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmaill.useQuery({
    token,
  });
  if (isError) {
    return (
      <div className='flex flex-col items-center gap-2'>
        <XCircle className='h-8 w-8 text-red-600' />
        <h3 className='font-semibold text-xl'>There was a problem</h3>
        <p className='text-muted-foreground text-sm'>
          This token is not valid or might be expired. Please try again
        </p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 text-zinc-300 animate-spin' />
        <h3 className='font-semibold text-xl'>Verifying...</h3>
        <p className='text-muted-foreground text-sm'>
          This won&apos;t take long.
        </p>
      </div>
    );
  }
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
        <Image src='/hippo-email-sent.png' alt='hippo image' fill />
      </div>
      <h3 className='font-semibold text-2xl'>you&apos;re all set!</h3>
      <p className='text-muted-foreground text-center mt-1'>
        Thanyou for verifying your email
      </p>
      <Link
        href='/sign-in'
        className={buttonVariants({
          className: 'mt-4',
        })}
      >
        Sign in
      </Link>
    </div>
  );
};

export default VerifyEmail;