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
    // We create the column as a plain integer first to avoid foreign key errors on cold start.
    try {
      const pool = (payload.db as any).pool
      if (pool) {
        // 1. Create the column (failsafe, no foreign key dependency)
        await pool.query(`
          ALTER TABLE "payload_locked_documents_rels"
            ADD COLUMN IF NOT EXISTS "partner_applications_id" integer
        `)
        
        // 2. Create the index
        await pool.query(`
          CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_partner_applications_id_idx"
            ON "payload_locked_documents_rels" ("partner_applications_id")
        `)

        // 3. Try to add the Foreign Key constraint (runs only if partner_applications table exists)
        try {
          await pool.query(`
            ALTER TABLE "payload_locked_documents_rels"
              ADD CONSTRAINT "payload_locked_documents_rels_partner_applications_id_fk"
                FOREIGN KEY ("partner_applications_id")
                REFERENCES "partner_applications"("id") ON DELETE CASCADE
          `)
        } catch (fkError: any) {
          payload.logger.warn('onInit FK constraint warning (safe to ignore on cold start): ' + fkError.message)
        }

        // 4. Ensure "services_related_links" table exists (safe-sync for array relations)
        try {
          // Check if "services_related_links" has id column as integer/serial, and drop/recreate with varchar if so
          const res = await pool.query(`
            SELECT data_type FROM information_schema.columns 
            WHERE table_name = 'services_related_links' AND column_name = 'id'
          `)
          if (res.rows.length > 0 && res.rows[0].data_type === 'integer') {
            payload.logger.info('Dropping outdated integer-id services_related_links table...')
            await pool.query('DROP TABLE IF EXISTS "services_related_links" CASCADE')
          }
        } catch (e: any) {
          payload.logger.warn('Failed checking services_related_links id column: ' + e.message)
        }

        try {
          await pool.query(`
            CREATE TABLE IF NOT EXISTS "services_related_links" (
              "id" varchar PRIMARY KEY,
              "_order" integer NOT NULL,
              "_parent_id" integer NOT NULL REFERENCES "services"("id") ON DELETE CASCADE,
              "label" text,
              "url" text
            )
          `)
          await pool.query(`
            CREATE INDEX IF NOT EXISTS "services_related_links_order_idx" ON "services_related_links" ("_order")
          `)
          await pool.query(`
            CREATE INDEX IF NOT EXISTS "services_related_links_parent_id_idx" ON "services_related_links" ("_parent_id")
          `)
        } catch (tableError: any) {
          payload.logger.warn('onInit services_related_links creation note: ' + tableError.message)
        }

        // 5. Ensure "homepage_process" table exists (safe-sync for array relations)
        try {
          // Check if "homepage_process" has id column as integer/serial, and drop/recreate with varchar if so
          const res = await pool.query(`
            SELECT data_type FROM information_schema.columns 
            WHERE table_name = 'homepage_process' AND column_name = 'id'
          `)
          if (res.rows.length > 0 && res.rows[0].data_type === 'integer') {
            payload.logger.info('Dropping outdated integer-id homepage_process table...')
            await pool.query('DROP TABLE IF EXISTS "homepage_process" CASCADE')
          }
        } catch (e: any) {
          payload.logger.warn('Failed checking homepage_process id column: ' + e.message)
        }

        try {
          await pool.query(`
            CREATE TABLE IF NOT EXISTS "homepage_process" (
              "id" varchar PRIMARY KEY,
              "_order" integer NOT NULL,
              "_parent_id" integer NOT NULL REFERENCES "homepage"("id") ON DELETE CASCADE,
              "title" text,
              "desc" text
            )
          `)
          await pool.query(`
            CREATE INDEX IF NOT EXISTS "homepage_process_order_idx" ON "homepage_process" ("_order")
          `)
          await pool.query(`
            CREATE INDEX IF NOT EXISTS "homepage_process_parent_id_idx" ON "homepage_process" ("_parent_id")
          `)
        } catch (tableError: any) {
          payload.logger.warn('onInit homepage_process creation note: ' + tableError.message)
        }

        // 6. Ensure "homepage" table has the new footer cta columns
        try {
          await pool.query(`
            ALTER TABLE "homepage"
              ADD COLUMN IF NOT EXISTS "footer_cta_headline" text,
              ADD COLUMN IF NOT EXISTS "footer_cta_subhead" text,
              ADD COLUMN IF NOT EXISTS "footer_cta_primary_cta" text,
              ADD COLUMN IF NOT EXISTS "footer_cta_secondary_cta" text
          `)
        } catch (colError: any) {
          payload.logger.warn('onInit homepage columns creation note: ' + colError.message)
        }
      }
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
