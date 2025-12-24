export enum UserRole {
    ADMIN = 'ADMIN',
    FINAL_USER = 'FINAL_USER',
    STAFF_USER = 'STAFF',
    PROFILE_MANAGEMENT = 'PROFILE_MANAGEMENT',
    PARTNER = 'PARTNER',
}

export enum Permission {
    EDIT_PROFILE_IMAGE = 'EDIT_PROFILE_IMAGE',
    EDIT_BIOGRAPHY = 'EDIT_BIOGRAPHY',
    SEE_MENU_ITEM_WL = 'SEE_MENU_ITEM_WL',
    MY_HOSTING = 'MY_HOSTING',
    MANAGE_MEMBER = 'MANAGE_MEMBER',
    TEAM = 'TEAM',
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
    [UserRole.PARTNER]: [
        Permission.TEAM,
    ],
    [UserRole.ADMIN]: [
        Permission.EDIT_PROFILE_IMAGE,
        Permission.EDIT_BIOGRAPHY,
    ],
    [UserRole.FINAL_USER]: [],
    [UserRole.STAFF_USER]: [
        Permission.SEE_MENU_ITEM_WL
    ],
    [UserRole.PROFILE_MANAGEMENT]: [
        Permission.MY_HOSTING,
        Permission.MANAGE_MEMBER 
    ]
}