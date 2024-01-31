import { buildConfig } from 'payload/config';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import path from 'path';
import { Users } from './collections/Users';
import dotenv from 'dotenv';
import { Products } from './collections/Products/product';
import { Media } from './collections/Media';
import { ProductFile } from './collections/ProductFile';
import { Orders } from './collections/Order';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});
export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [Users, Products, Media, ProductFile, Orders],
  routes: {
    admin: '/sell',
  },
  admin: {
    user: 'users',
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- Markterplace',
      favicon: '/favicon.ico',
      ogImage: '/thubnail.jpg',
    },
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGO_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload.d.ts'),
  },
});
