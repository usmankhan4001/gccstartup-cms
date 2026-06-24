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
import { leadEndpoint } from './endpoints/lead'
import { partnerEndpoint } from './endpoints/partner'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: { user: Users.slug, importMap: { baseDir: path.resolve(dirname) } },
  // Multilingual content. English is the default/fallback; every other locale is
  // served under a /<code> path prefix and populated by translate.ts (Google Cloud Translate).
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'العربية (Arabic)', code: 'ar', rtl: true },
      { label: '繁體中文 (Chinese)', code: 'zh' },
      { label: 'Deutsch (German)', code: 'de' },
      { label: 'Français (French)', code: 'fr' },
      { label: 'Nederlands (Dutch)', code: 'nl' },
      { label: 'Español (Spanish)', code: 'es' },
      { label: 'Italiano (Italian)', code: 'it' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  editor: lexicalEditor(),
  collections: [Users, Media, Countries, Services, PricingTiers, Posts, Leads, PartnerApplications],
  globals: [Homepage, SiteSettings],
  endpoints: [leadEndpoint, partnerEndpoint],
  cors: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(','),
  csrf: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(','),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || '' },
    // Auto-create/sync tables on boot (simple deploys without a migration step).
    push: true,
  }),
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
