'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AuthSchema,
  TAuthScehma,
} from '@/lib/ValidationSchemas/account-credential.scehma';
import { trpc } from '@/trpc/client';
import { toast } from 'sonner';
import { ZodError } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSeller = searchParams.get('as') === 'seller';
  const origin = searchParams.get('origin');
  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onError: (err) => {
      if (err.data?.code === 'UNAUTHORIZED') {
        toast.error('Invalid email or password');
        return;
      }
      if (err instanceof ZodError) {
        toast.error(err?.issues[0].message);
        return;
      }
      toast.error('Something went wrong. Please try again');
    },
    onSuccess: () => {
      toast.success('Signed in sucessfully');
      router.refresh();
      if (origin) {
        router.push(`/${origin}`);
        return;
      }
      if (isSeller) {
        router.push('/sell');
        return;
      }
      router.push('/');
    },
  });
  const continueAsBuyer = () => {
    router.replace('/sign-in', undefined);
  };
  const continueAsSeller = () => {
    router.push('?as=seller');
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthScehma>({
    resolver: zodResolver(AuthSchema),
  });
  console.log('errors ', errors);
  const onSubmit = ({ email, password }: TAuthScehma) => {
    console.log(`onSubmit`, { email, password });
    signIn({
      email,
      password,
    });
  };
  return (
    <>
      {/* form */}
      <div className='grid gap-6'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <div className='grid gap-1 py-2 gap-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                {...register('email', {
                  required: 'Email is required',
                })}
                className={cn({
                  'focus-visible:ring-red-500': errors.email,
                })}
                placeholder='you@example.com'
                type='email'
              />
              {errors?.email && (
                <p className='text-sm text-red-500'>{errors.email.message}</p>
              )}
            </div>
            <div className='grid gap-1 gap-y-2 py-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                {...register('password', {
                  required: 'Password is required',
                })}
                className={cn({
                  'focus-visible:ring-red-500': errors.email,
                })}
                placeholder='Password'
                type='password'
              />
              {errors?.password && (
                <p className='text-sm text-red-500'>
                  {errors?.password.message}
                </p>
              )}
            </div>
            <Button>Sign in</Button>
          </div>
        </form>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center '>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>or</span>
          </div>
        </div>
        {isSeller ? (
          <Button
            variant='secondary'
            disabled={isLoading}
            onClick={continueAsBuyer}
          >
            Continue as buyer
          </Button>
        ) : (
          <Button
            variant='secondary'
            disabled={isLoading}
            onClick={continueAsSeller}
          >
            Continue as seller
          </Button>
        )}
      </div>
    </>
  );
};

export default page;
