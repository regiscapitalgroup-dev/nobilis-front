export interface TeamModel {
  id: number
  user: TeamUser
  role: TeamRole
  joinedAt: string
}

export interface TeamUser {
  id: number
  email: string
  firstName: string
  lastName: string
  phone: string
}

export interface TeamRole {
  id: number
  code: string
  name: string
  description: string
  isAdmin: boolean
}