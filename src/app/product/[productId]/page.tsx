import { PRODUCT_CATEGORIES } from '@/app/config';
import ImageSlider from '@/components/ImageSlider';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { getPayloadClient } from '@/get-payload';
import { formatPrice } from '@/lib/utils';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    productId: string;
  };
}
const BREADCRUMS = [
  {
    id: 1,
    name: 'Home',
    href: '/',
  },
  {
    id: 2,
    name: 'Products',
    href: '/products',
  },
];
const page = async ({ params: { productId } }: PageProps) => {
  const payload = await getPayloadClient();
  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
    },
  });
  const [product] = products;
  if (!product) return notFound();

  const label = PRODUCT_CATEGORIES.find(
    (p) => p.value === product.category
  )?.label;
  return (
    <MaxWidthWrapper>
      <div className='bg-white '>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-5 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
          <div className='lg:max-w-lg lg:self-end'>
            <ol className='flex items-center space-x-2 '>
              {BREADCRUMS.map(({ id, name, href }, i) => (
                <li key={id}>
                  <div className='flex items-center text-sm'>
                    <Link
                      href={href}
                      className='font-medium text-sm text-muted-foreground hover:text-gray-900'
                    >
                      {name}
                    </Link>
                    {i !== BREADCRUMS.length - 1 ? (
                      <svg
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                        className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'
                      >
                        <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
            <div className='mt-4'>
              <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl '>
                {product.name}
              </h1>
            </div>
            <section className='mt-4'>
              <div className='flex items-center'>
                <p className='font-medium text-gray-900'>
                  {formatPrice(product.price)}
                </p>
                <div className='ml-4 border-l text-muted-foreground border-gray-300 pl-4'>
                  {label}
                </div>
                <div className='mt-4 space-y-6'>
                  <p className='text-base text-muted-foreground'>
                    {product.description}{' '}
                  </p>
                </div>
                <div className='mt-6 flex items-center'>
                  <Check className='h-5 w-5 flex-shrink-0 text-green-500' />
                  <p className='ml-2 text-sm text-muted-foreground'>
                    Eligible for instant delivery
                  </p>
                </div>
              </div>
            </section>
          </div>
          {/* {product images} */}
          <div className='mt-10 lg:col-start-2 lg:row-start-2 lg:mt-0 lg:self-center'>
            <div className='aspect-square rounded-lg'>
              <ImageSlider
                urls={
                  product.images
                    .map(({ image }) =>
                      typeof image === 'string' ? image : image.url
                    )
                    .filter(Boolean) as string[]
                }
              />
            </div>
          </div>
          {/* add to cart */}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
