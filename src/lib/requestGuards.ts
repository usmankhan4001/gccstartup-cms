const buckets = new Map<string, { count: number; resetAt: number }>()

export function getClientIp(req: { headers: Headers }) {
  return req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('cf-connecting-ip') || 'unknown'
}

export function rateLimit(key: string, limit = 10, windowMs = 60_000) {
  const now = Date.now()
  const current = buckets.get(key)
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (current.count >= limit) return false
  current.count += 1
  return true
}

export const cleanString = (value: unknown, max = 500) => String(value || '').trim().slice(0, max)
export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
export const digits = (value: unknown) => String(value || '').replace(/\D/g, '')

export const allowedAttachmentMimeTypes = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export const maxAttachmentBytes = 10 * 1024 * 1024
export const maxAttachmentCount = 5

export function attachmentIds(value: unknown): number[] {
  const raw = Array.isArray(value) ? value : value ? [value] : []
  return raw
    .map((item) => {
      if (typeof item === 'number') return item
      if (typeof item === 'string' && /^\d+$/.test(item)) return Number(item)
      if (item && typeof item === 'object' && 'id' in item) return (item as any).id
      return null
    })
    .filter((item): item is number => typeof item === 'number')
}
