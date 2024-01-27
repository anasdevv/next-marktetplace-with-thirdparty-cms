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
} from '@/lib/schemas/account-credential.scehma';
import { trpc } from '@/trpc/client';

const page = () => {
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
  };
  const data = trpc.anyApiRoute.useQuery();
  console.log('data ', data.data);
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
            </div>
            <Button>Sign in</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default page;
