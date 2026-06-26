import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Payload/sharp must not be bundled by Next's server build
  serverExternalPackages: ['sharp'],
  output: 'standalone',
}

export default withPayload(nextConfig)
