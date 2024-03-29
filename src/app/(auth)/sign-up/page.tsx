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
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (err) => {
      if (err.data?.code === 'CONFLICT') {
        toast.error('This email is already in use. Sign in instead ?');
        return;
      }
      if (err instanceof ZodError) {
        toast.error(err?.issues[0].message);
        return;
      }
      toast.error('Something went wrong. Please try again');
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(`Verification email sent to ${sentToEmail}`);
      router.push(`/verify-email?to=${sentToEmail}`);
    },
  });

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
    mutate({
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
      </div>
    </>
  );
};

export default page;
