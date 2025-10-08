import { ExperienceModel } from "../pages/experiences/models/ExperienceModel";

export async function getExperiences(): Promise<ExperienceModel[]> {
  // Simulación de carga remota (reemplázalo con tu API real)
  return Promise.resolve([
    {
      id: 1,
      title: 'Luxury Retreat in Tuscany',
      hostName: 'John Capwell',
      hostAvatar: 'https://placehold.co/32x32',
      guests: 12,
      date: '15 July 2025',
      daysLeft: 5,
      topic: 'Wine & Culinary Experience',
      message:
        'Join us in Tuscany for an unforgettable wine and gastronomy retreat, connecting with other Nobilis members.',
      imageUrl: 'https://placehold.co/240x338',
      category: 'requests',
    },
    {
      id: 2,
      title: 'Private Art Exhibition',
      hostName: 'Sophie Rivera',
      hostAvatar: 'https://placehold.co/32x32',
      guests: 20,
      date: '20 July 2025',
      daysLeft: 2,
      topic: 'Modern Art & Networking',
      message:
        'An exclusive evening with international artists and collectors in London.',
      imageUrl: 'https://placehold.co/240x338',
      category: 'active',
    },
    {
      id: 3,
      title: 'Philanthropy Dinner',
      hostName: 'Carlos Mendez',
      hostAvatar: 'https://placehold.co/32x32',
      guests: 15,
      date: '1 June 2025',
      daysLeft: 0,
      topic: 'Charity & Leadership',
      message:
        'Gathering of philanthropists to discuss social impact initiatives across Latin America.',
      imageUrl: 'https://placehold.co/240x338',
      category: 'past',
    },
  ])
}
