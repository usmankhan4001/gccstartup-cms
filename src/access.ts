import type { Access, FieldAccess } from 'payload'

export const isAuthenticated: Access = ({ req }) => Boolean(req.user)

export const isAdmin: Access = ({ req }) => req.user?.role === 'admin'

export const publicRead: Access = () => true

export const publishedOrAuthenticated: Access = ({ req }) => (
  req.user ? true : { _status: { equals: 'published' } }
)

export const authenticatedField: FieldAccess = ({ req }) => Boolean(req.user)

export const adminField: FieldAccess = ({ req }) => req.user?.role === 'admin'

export const adminOnly = {
  create: isAdmin,
  read: isAdmin,
  update: isAdmin,
  delete: isAdmin,
}

export const authenticatedOnly = {
  create: isAuthenticated,
  read: isAuthenticated,
  update: isAuthenticated,
  delete: isAuthenticated,
}

export const publicReadAdminWrite = {
  create: isAdmin,
  read: publicRead,
  update: isAdmin,
  delete: isAdmin,
}
