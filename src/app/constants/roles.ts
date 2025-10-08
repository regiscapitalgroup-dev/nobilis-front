export enum UserRole {
    ADMIN = 'ADMIN',
    FINAL_USER = 'FINAL_USER',
}

export enum Permission {
    EDIT_PROFILE_IMAGE = 'EDIT_PROFILE_IMAGE',
    EDIT_BIOGRAPHY = 'EDIT_BIOGRAPHY',
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
    [UserRole.ADMIN]: [
        Permission.EDIT_PROFILE_IMAGE,
        Permission.EDIT_BIOGRAPHY,
    ],
    [UserRole.FINAL_USER]:[]
}