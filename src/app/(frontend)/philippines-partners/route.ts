import { htmlResponse, partnerPageHTML } from '@/lib/renderSite'

export const dynamic = 'force-dynamic'

export async function GET() {
  return htmlResponse(partnerPageHTML())
}
