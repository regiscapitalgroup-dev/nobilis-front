export interface TeamModel {
  id: number
  userData: TeamUser
  role: TeamRole
  joinedAt: string
  phoneNumber: string
}

export interface TeamUser {
  id: number
  email: string
  firstName: string
  lastName: string
}

export interface TeamRole {
  id: number
  code: string
  name: string
  description: string
  isAdmin: boolean
}