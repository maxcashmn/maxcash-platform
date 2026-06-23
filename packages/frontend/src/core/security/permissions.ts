export const PERMISSIONS = {
  USER_READ: 'user:read',
  USER_WRITE: 'user:write',
  USER_DELETE: 'user:delete',
  USER_UPDATE: 'user:update',
  LOAN_READ: 'loan:read',
  LOAN_WRITE: 'loan:write',
  LOAN_APPROVE: 'loan:approve',
  LOAN_REJECT: 'loan:reject',
  LOAN_DISBURSE: 'loan:disburse',
  TRANSACTION_READ: 'transaction:read',
  TRANSACTION_WRITE: 'transaction:write',
  WALLET_READ: 'wallet:read',
  WALLET_WRITE: 'wallet:write',
  AUDIT_READ: 'audit:read',
  AUDIT_WRITE: 'audit:write',
  ADMIN_ACCESS: 'admin:access',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

export const hasPermission = (
  userPermissions: string[],
  requiredPermission: Permission
): boolean => userPermissions.includes(requiredPermission);

export const hasAnyPermission = (
  userPermissions: string[],
  requiredPermissions: Permission[]
): boolean => requiredPermissions.some((p) => userPermissions.includes(p));

export const hasAllPermissions = (
  userPermissions: string[],
  requiredPermissions: Permission[]
): boolean => requiredPermissions.every((p) => userPermissions.includes(p));
