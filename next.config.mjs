import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '*',
        search: '',
      },

    ]
  },
  reactStrictMode: true,
  serverExternalPackages: [
    'ts-morph',
    'typescript',
    'twoslash',
  ],
};

export default withMDX(config);
