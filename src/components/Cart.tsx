import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ShoppingCart, ShoppingCartIcon } from 'lucide-react';
import { Separator } from './ui/separator';
import { formatPrice } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
const Cart = () => {
  const itemCount = 0;
  return (
    <Sheet>
      <SheetTrigger className='group -m-2 flex items-center p-2'>
        <ShoppingCart className='h-6 w-6 flex-shrink-0 text-gray-400 group:hover:text-gray-500' />
        <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
          0
        </span>
      </SheetTrigger>
      <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
        <SheetHeader className='space-y-2.5 pr-6'>
          <SheetTitle>Cart (0)</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className='flex w-full flex-col pr-6'>
              {/* todo cart logic */}
              cart items
            </div>
            <div className='space-y-4 pr-6'>
              <Separator />
              <div className='space-y-1.5 text-sm mt-2'>
                <div className='flex'>
                  <span className='flex-1'> Shipping</span>
                  <span>Free</span>
                </div>
                <div className='flex'>
                  <span className='flex-1'>Transaction Fee</span>
                  <span>{formatPrice(1)}</span>
                </div>
                <div className='flex'>
                  <span className='flex-1'>Total</span>
                  <span>{formatPrice(1)}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href='/cart'
                    className={buttonVariants({
                      className: 'w-full',
                    })}
                  >
                    Continue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className='flex h-full flex-col items-center justify-center space-y-1'>
            <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
              <Image
                src='/hippo-empty-cart.png'
                fill
                alt='empty shopping cart image'
                aria-hidden='true'
              />
            </div>
            <div className='text-xl font-semibold flex flex-col items-center'>
              Your cart is empty
              <SheetTrigger asChild>
                <Link
                  className={buttonVariants({
                    variant: 'link',
                    size: 'sm',
                    className: 'text-sm text-muted-foreground',
                  })}
                  href='/products'
                >
                  Add items to your cart to checkout
                </Link>
              </SheetTrigger>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
