import { NextResponse } from 'next/server'
import { runSeed } from '../../../../../seed'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const secret = url.searchParams.get('secret')

    if (secret !== 'run-my-seed') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await runSeed()
    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
