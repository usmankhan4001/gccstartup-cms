import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Payload/sharp must not be bundled by Next's server build
  serverExternalPackages: ['sharp'],
  webpack: (config) => {
    // Allow webpack to resolve and process .cjs files (CommonJS modules with require())
    config.module.rules.push({
      test: /\.cjs$/,
      type: 'javascript/auto',
      resolve: { fullySpecified: false },
    })
    return config
  },
}

export default withPayload(nextConfig)
