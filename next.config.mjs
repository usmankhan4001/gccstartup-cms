import { withPayload } from '@payloadcms/next/withPayload'
import { fileURLToPath } from 'url'
import path from 'path'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Payload/sharp must not be bundled by Next's server build
  serverExternalPackages: ['sharp'],
  output: process.platform === 'win32' ? undefined : 'standalone',
  outputFileTracingRoot: dirname,
  // Next 15.5 currently generates invalid validator imports for this src/app route-group setup.
  // Keep using `pnpm exec tsc --noEmit` for actual source type validation.
  typescript: { ignoreBuildErrors: true },
}

export default withPayload(nextConfig)

