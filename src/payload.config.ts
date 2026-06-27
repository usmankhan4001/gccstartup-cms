import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Documents } from './collections/Documents'
import { Countries } from './collections/Countries'
import { Services } from './collections/Services'
import { PricingTiers } from './collections/PricingTiers'
import { Posts } from './collections/Posts'
import { Leads } from './collections/Leads'
import { PartnerApplications } from './collections/PartnerApplications'
import { LandingPages } from './collections/LandingPages'
import { FormSubmissions } from './collections/FormSubmissions'
import { Homepage } from './globals/Homepage'
import { SiteSettings } from './globals/SiteSettings'
import { PartnerPage } from './globals/PartnerPage'
import { WahaSettings } from './globals/WahaSettings'
import { leadEndpoint } from './endpoints/lead'
import { partnerEndpoint } from './endpoints/partner'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: { 
    user: Users.slug, 
    importMap: { baseDir: path.resolve(dirname) },
    livePreview: {
      url: ({ data, collectionConfig, globalConfig }) => {
        if (globalConfig?.slug === 'homepage') return '/'
        if (globalConfig?.slug === 'partnerPage') return '/philippines-partners'
        if (collectionConfig?.slug === 'countries') return `/${data.slug}`
        if (collectionConfig?.slug === 'services') return `/services/${data.slug}`
        if (collectionConfig?.slug === 'pricingTiers') return `/pricing/${data.slug}`
        if (collectionConfig?.slug === 'posts') return `/blog/${data.slug}`
        if (collectionConfig?.slug === 'landingPages') return `/lp/${data.slug}`
        return '/'
      },
      collections: ['countries', 'services', 'pricingTiers', 'posts', 'landingPages'],
      globals: ['homepage', 'partnerPage'],
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  editor: lexicalEditor(),
  collections: [Users, Media, Documents, Countries, Services, PricingTiers, Posts, Leads, PartnerApplications, LandingPages, FormSubmissions],
  globals: [Homepage, SiteSettings, PartnerPage, WahaSettings],
  endpoints: [leadEndpoint, partnerEndpoint],
  cors: '*',
  csrf: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://cms.gccstartup.com',
    'https://gccstartup.com',
    'https://www.gccstartup.com',
    ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',').map((x: string) => x.trim()) : [])
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  plugins: [
    seoPlugin({
      collections: ['countries', 'services', 'pricingTiers', 'posts', 'landingPages'],
      globals: ['homepage', 'partnerPage'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }: any) => `${doc?.name || doc?.title || 'GCC Startup'} — GCC Startup`,
      generateDescription: ({ doc }: any) => doc?.intro || doc?.excerpt || '',
    }),
    s3Storage({
      collections: { media: true, documents: true },
      bucket: process.env.R2_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        endpoint: process.env.R2_ENDPOINT,
        region: 'auto',
        forcePathStyle: true,
      },
    }),
  ],
})
