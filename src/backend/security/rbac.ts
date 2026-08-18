/**
 * Richbecky Gallery — Role-Based Access Control (RBAC) Matrix & Environment Config
 */

import { SystemUserRole } from '../types';

export type PermissionAction =
  // Artwork actions
  | 'artwork:create'
  | 'artwork:edit_own'
  | 'artwork:approve'
  | 'artwork:publish'
  | 'artwork:delete'
  // Artist Application actions
  | 'application:submit'
  | 'application:review'
  // Order & Financial actions
  | 'order:create'
  | 'order:view_own'
  | 'order:manage_all'
  | 'commission:view_own'
  | 'commission:manage_all'
  // Admin Audit
  | 'audit:view';

const ROLE_PERMISSIONS: Record<SystemUserRole, Set<PermissionAction>> = {
  customer: new Set([
    'artwork:create', // Requesting artwork commission inquiry
    'order:create',
    'order:view_own'
  ]),
  artist: new Set([
    'artwork:create',
    'artwork:edit_own',
    'application:submit',
    'order:view_own',
    'commission:view_own'
  ]),
  admin: new Set([
    'artwork:create',
    'artwork:edit_own',
    'artwork:approve',
    'artwork:publish',
    'artwork:delete',
    'application:submit',
    'application:review',
    'order:create',
    'order:view_own',
    'order:manage_all',
    'commission:view_own',
    'commission:manage_all',
    'audit:view'
  ]),
  owner_content: new Set([
    'artwork:create',
    'artwork:edit_own',
    'artwork:approve',
    'artwork:publish',
    'artwork:delete',
    'application:submit',
    'application:review',
    'order:create',
    'order:view_own',
    'order:manage_all',
    'commission:view_own',
    'commission:manage_all',
    'audit:view'
  ]),
  admin_support: new Set([
    'application:review',
    'order:create',
    'order:view_own',
    'order:manage_all',
    'audit:view'
  ]),
  web_developer: new Set([
    'audit:view'
  ])
};

export class RBACService {
  public static hasPermission(role: SystemUserRole, action: PermissionAction): boolean {
    const permissions = ROLE_PERMISSIONS[role];
    return permissions ? permissions.has(action) : false;
  }

  public static assertPermission(role: SystemUserRole, action: PermissionAction): void {
    if (!this.hasPermission(role, action)) {
      throw new Error(`Access Denied: Role '${role}' lacks permission for action '${action}'.`);
    }
  }
}
