// Runs before `next start` to apply any schema changes push: true missed.
// Uses IF NOT EXISTS / IF EXISTS everywhere so it is safe to re-run on every deploy.
const { Client } = require('pg')

const client = new Client({ connectionString: process.env.DATABASE_URI })

async function main() {
  await client.connect()
  console.log('[migrate] connected to database')

  await client.query(`
    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "partner_applications_id" integer
        REFERENCES "partner_applications"("id") ON DELETE CASCADE
  `)

  await client.query(`
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_partner_applications_id_idx"
      ON "payload_locked_documents_rels" ("partner_applications_id")
  `)

  console.log('[migrate] done')
  await client.end()
}

main().catch(async (err) => {
  console.error('[migrate] error:', err.message)
  await client.end().catch(() => {})
  process.exit(1)
})
