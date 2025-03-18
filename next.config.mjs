import { createMDX } from 'fumadocs-mdx/next';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
 
const withMDX = createMDX({
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: (v) => [rehypeKatex, ...v],
    lastModifiedTime: 'git',
  },
});

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
  transpilePackages: ['avalanche-docs-toolbox']
};

export default withMDX(config);
