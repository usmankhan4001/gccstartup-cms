import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import test from 'node:test'
import { leadEndpoint } from '../src/endpoints/lead'
import { partnerEndpoint } from '../src/endpoints/partner'

const jsonReq = (body: Record<string, unknown>, ip = randomUUID()) => ({
  headers: new Headers({
    'content-type': 'application/json',
    'x-forwarded-for': ip,
  }),
  json: async () => body,
  payload: {
    logger: { error: () => undefined },
  },
})

test('lead endpoint rejects submissions without email or phone', async () => {
  const response = await leadEndpoint.handler(jsonReq({ name: 'No Contact' }) as any)
  const body = await response.json()

  assert.equal(response.status, 422)
  assert.equal(body.ok, false)
  assert.equal(body.error, 'email or phone required')
})

test('lead endpoint rejects invalid email', async () => {
  const response = await leadEndpoint.handler(jsonReq({ email: 'not-an-email' }) as any)
  const body = await response.json()

  assert.equal(response.status, 422)
  assert.equal(body.ok, false)
  assert.equal(body.error, 'valid email required')
})

test('partner endpoint requires name and whatsapp', async () => {
  const response = await partnerEndpoint.handler(jsonReq({ email: 'partner@example.com' }) as any)
  const body = await response.json()

  assert.equal(response.status, 422)
  assert.equal(body.ok, false)
  assert.equal(body.error, 'fullName and whatsapp are required')
})

test('partner endpoint rejects invalid email', async () => {
  const response = await partnerEndpoint.handler(jsonReq({ fullName: 'Partner', whatsapp: '+971501234567', email: 'bad' }) as any)
  const body = await response.json()

  assert.equal(response.status, 422)
  assert.equal(body.ok, false)
  assert.equal(body.error, 'valid email required')
})
