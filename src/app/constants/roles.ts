export enum UserRole {
    ADMIN = 'ADMIN',
    FINAL_USER = 'FINAL_USER',
    STAFF_USER = 'STAFF',
}

export enum Permission {
    EDIT_PROFILE_IMAGE = 'EDIT_PROFILE_IMAGE',
    EDIT_BIOGRAPHY = 'EDIT_BIOGRAPHY',
    SEE_MENU_ITEM_WL = 'SEE_MENU_ITEM_WL'
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
    [UserRole.ADMIN]: [
        Permission.EDIT_PROFILE_IMAGE,
        Permission.EDIT_BIOGRAPHY,
    ],
    [UserRole.FINAL_USER]: [],
    [UserRole.STAFF_USER]: [
        Permission.SEE_MENU_ITEM_WL
    ]
}