/* export interface PaginatedExperiencesResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: ExperienceFooterModel[];
  } */
  
  export interface ExperienceFooterModel {
    id: number;
    title: string;
    authors: AuthorModel[];
    experiencePhotograph: string;
    description: string;
    city: string;
    price: number;
    isNew: boolean;
    createdAt: string;
  }
  
  export interface AuthorModel {
    id: number;
    name: string;
    photoUrl: string;
  }
  