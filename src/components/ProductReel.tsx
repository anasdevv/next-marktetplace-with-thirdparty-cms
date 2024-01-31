'use client';
import { TQueryValidator } from '@/lib/ValidationSchemas/query-validator';
import { Product } from '@/payload';
import { trpc } from '@/trpc/client';
import Link from 'next/link';
import React from 'react';
import ProductListing from './ProductListing';
interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  query: TQueryValidator;
}
const FALLBACK_LIMIT = 4;
const ProductReel = ({ title, subtitle, href, query }: ProductReelProps) => {
  const { data: queryResult, isLoading } =
    trpc.getInfiniteProducts.useInfiniteQuery(
      {
        limit: query?.limit || FALLBACK_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
        // getNextPageParam : (lastPage) => lastPage.nextPage
      }
    );
  const res = queryResult?.pages.flatMap((page) => page.items);
  let products: (Product | null)[] = [];
  if (res && res.length) {
    products = res;
  } else if (isLoading) {
    (products = new Array<null>(query.limit ?? FALLBACK_LIMIT)).fill(null);
  }
  return (
    <section className='py-12'>
      <div className='md:flex md:items-center md:justify-between  mb-4'>
        <div className='max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
          {title ? (
            <h1 className='text-2xl font-bold text-gray-900  sm:text-3xl'></h1>
          ) : null}
          {subtitle ? (
            <p className='mt-2 text-sm text-muted-foreground'></p>
          ) : null}
        </div>
        {href ? (
          <Link
            href={href}
            className='hiiden text-sm font-medium  text-blue-600 hover:text-blue-500 md:block'
          >
            Shop the collection
            <span aria-hidden='true'>&rarr;</span>
          </Link>
        ) : null}
      </div>
      <div className='rleative'>
        <div className='mt-5 flex items-center w-full'>
          <div className='w-full grid gird-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8'>
            {products.map((product, i) => (
              <ProductListing product={product} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
