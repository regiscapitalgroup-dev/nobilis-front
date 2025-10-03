import {UserRole, Permission, ROLE_PERMISSIONS} from '../constants/roles'
import {UserModel} from '../modules/auth/models/UserModel'

export const hasPermission = (user: UserModel | null, permission: Permission): boolean => {
  if (!user || !user.role) return false
  
  const userRole = user.role as UserRole
  const permissions = ROLE_PERMISSIONS[userRole] || []
  
  return permissions.includes(permission)
}

export const hasRole = (user: UserModel | null, role: UserRole): boolean => {
  if (!user || !user.role) return false
  return user.role === role
}