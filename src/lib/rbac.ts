import { Role } from '@prisma/client';

export const rbac = {
  canManageOrganization: (role: Role) => role === 'ADMIN',
  canReadAll: (role: Role) => role === 'ADMIN' || role === 'MANAGER' || role === 'VIEWER',
  canWriteAll: (role: Role) => role === 'ADMIN' || role === 'MANAGER',
  canWriteOwnedOnly: (role: Role) => role === 'SALES'
};

export function hasAccess(role: Role, ownerId: string | null, userId: string) {
  if (rbac.canWriteAll(role)) {
    return true;
  }
  if (rbac.canWriteOwnedOnly(role)) {
    return ownerId === userId;
  }
  return false;
}
