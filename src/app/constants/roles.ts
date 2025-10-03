export enum UserRole {
    ADMIN = 'ADMIN',
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
}