import { withPayload } from '@payloadcms/next/withPayload'
import { fileURLToPath } from 'url'
import path from 'path'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Payload/sharp must not be bundled by Next's server build
  serverExternalPackages: ['sharp', 'libsql', '@libsql/client'],
  output: process.platform === 'win32' ? undefined : 'standalone',
  outputFileTracingRoot: dirname,
}

export default withPayload(nextConfig)


