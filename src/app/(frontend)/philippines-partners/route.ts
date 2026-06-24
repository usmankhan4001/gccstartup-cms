import { htmlResponse } from '@/lib/renderSite'
import { partnerPageHTML } from '@/lib/partnerPage'

export const dynamic = 'force-dynamic'

export async function GET() {
  return htmlResponse(partnerPageHTML())
}
