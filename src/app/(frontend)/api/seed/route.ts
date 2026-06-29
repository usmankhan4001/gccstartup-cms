import { NextResponse } from 'next/server'
import { runSeed } from '../../../../../seed'

export async function GET(req: Request) {
  try {
    if (process.env.ENABLE_SEED_ROUTE !== 'true') {
      return NextResponse.json({ error: 'Seed route disabled' }, { status: 404 })
    }

    const url = new URL(req.url)
    const secret = url.searchParams.get('secret')
    const expectedSecret = process.env.SEED_ROUTE_SECRET

    if (!expectedSecret || secret !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await runSeed()
    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
