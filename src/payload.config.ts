import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Countries } from './collections/Countries'
import { Services } from './collections/Services'
import { PricingTiers } from './collections/PricingTiers'
import { Posts } from './collections/Posts'
import { Leads } from './collections/Leads'
import { PartnerApplications } from './collections/PartnerApplications'
import { Homepage } from './globals/Homepage'
import { SiteSettings } from './globals/SiteSettings'
import { PartnerPage } from './globals/PartnerPage'
import { leadEndpoint } from './endpoints/lead'
import { partnerEndpoint } from './endpoints/partner'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: { user: Users.slug, importMap: { baseDir: path.resolve(dirname) } },
  editor: lexicalEditor(),
  collections: [Users, Media, Countries, Services, PricingTiers, Posts, Leads, PartnerApplications],
  globals: [Homepage, SiteSettings, PartnerPage],
  endpoints: [leadEndpoint, partnerEndpoint],
  cors: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(','),
  csrf: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(','),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || '' },
    push: true,
  }),
  onInit: async (payload) => {
    // Ensure partner_applications_id column exists in payload_locked_documents_rels.
    // push: true doesn't always add FK columns to Payload's internal relation tables
    // in production, so we patch it here using the already-open pool.
    try {
      const pool = (payload.db as any).pool
      await pool.query(`
        ALTER TABLE "payload_locked_documents_rels"
          ADD COLUMN IF NOT EXISTS "partner_applications_id" integer
            REFERENCES "partner_applications"("id") ON DELETE CASCADE
      `)
      await pool.query(`
        CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_partner_applications_id_idx"
          ON "payload_locked_documents_rels" ("partner_applications_id")
      `)
    } catch (e: any) {
      payload.logger.warn('onInit migration note: ' + e.message)
    }
  },
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  plugins: [
    seoPlugin({
      collections: ['countries', 'services', 'pricingTiers', 'posts'],
      globals: ['homepage'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }: any) => `${doc?.name || doc?.title || 'GCC Startup'} — GCC Startup`,
      generateDescription: ({ doc }: any) => doc?.intro || doc?.excerpt || '',
    }),
  ],
})
