export interface ExperienceModel {
    id: number
    title: string
    hostName: string
    hostAvatar: string
    coHostAvatar: string
    guests: number
    date: string
    daysLeft: number
    topic: string
    message: string
    imageUrl: string
    category: 'requests' | 'active' | 'past'
  }
  