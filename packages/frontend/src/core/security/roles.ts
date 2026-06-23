import { PERMISSIONS, Permission } from './permissions';

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  AUDITOR: 'auditor',
  BORROWER: 'borrower',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_WRITE,
    PERMISSIONS.USER_DELETE,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.LOAN_READ,
    PERMISSIONS.LOAN_WRITE,
    PERMISSIONS.LOAN_APPROVE,
    PERMISSIONS.LOAN_REJECT,
    PERMISSIONS.LOAN_DISBURSE,
    PERMISSIONS.TRANSACTION_READ,
    PERMISSIONS.TRANSACTION_WRITE,
    PERMISSIONS.WALLET_READ,
    PERMISSIONS.WALLET_WRITE,
    PERMISSIONS.AUDIT_READ,
    PERMISSIONS.AUDIT_WRITE,
    PERMISSIONS.ADMIN_ACCESS,
  ],
  manager: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.LOAN_READ,
    PERMISSIONS.LOAN_WRITE,
    PERMISSIONS.LOAN_APPROVE,
    PERMISSIONS.LOAN_REJECT,
    PERMISSIONS.TRANSACTION_READ,
    PERMISSIONS.WALLET_READ,
  ],
  auditor: [
    PERMISSIONS.LOAN_READ,
    PERMISSIONS.TRANSACTION_READ,
    PERMISSIONS.WALLET_READ,
    PERMISSIONS.AUDIT_READ,
  ],
  borrower: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.LOAN_READ,
    PERMISSIONS.LOAN_WRITE,
    PERMISSIONS.TRANSACTION_READ,
    PERMISSIONS.WALLET_READ,
  ],
};

export const getRolePermissions = (role: Role): Permission[] => ROLE_PERMISSIONS[role] || [];

export const isAdmin = (role: string): boolean => role === ROLES.ADMIN;
export const isManager = (role: string): boolean => role === ROLES.MANAGER;
export const isAuditor = (role: string): boolean => role === ROLES.AUDITOR;
export const isBorrower = (role: string): boolean => role === ROLES.BORROWER;

export const isRoleAllowed = (role: string, allowedRoles: Role[]): boolean => 
  allowedRoles.includes(role as Role);
