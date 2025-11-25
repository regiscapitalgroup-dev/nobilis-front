export interface FullUserProfileModel {
    user: number;
    email: string;
    introductionHeadline: string;
    aliasTitle: string;
    profilePicture: string;
    birthday: string; 
    phoneNumber: string;
    city: string;
    postalCode: string;
    languages: string[];
    socialMediaProfiles: SocialMediaProfile[];
    bioPresentation: string;
    biography: string;
    personalDetail: PersonalDetail;
    professionalProfile: ProfessionalProfile;
    recognition: Recognition;
    expertise: Expertise[];
    videos: Video[];
    subscription: Subscription | null;
    picFooter: string;
    relatives: Relative[],
    lifePartnerName: string;
    lifePartnerLastname: string;
    postalAddress: string;
    introduction: [];
    oftenIn:[],
    firstName: string,
    surname: string,
    preferedPhone : boolean,
    preferedEmail: boolean
  }
  
  
  export interface IntroductionDetail {
    id: number;
    title: string;
  }

  export interface SocialMediaProfile {
    id: number;
    platformName: string;
    profileUrl: string;
  }
  
  export interface PersonalDetail {
    hobbies: string[];
    interests: string[];
    clubs: Club[];
  }
  
  export interface Club {
    name: string;
    city: string;
  }
  
  export interface ProfessionalProfile {
    industries: string[];
    professionalInterest: string[];
    workPositions: WorkPosition[];
    education: Education[];
    onBoard: OnBoard[];
    nonProfitInvolvement: NonProfitInvolvement[];
  }
  
  export interface WorkPosition {
    company: string;
    position: string;
    city: string;
    fromYear: string;
    toYear: string;
  }
  
  export interface Education {
    universityName: string;
    carreer: string;
    city: string;
    fromYear: string;
    toYear: string;
  }
  
  export interface OnBoard {
    company: string;
    position: string;
    city: string;
    fromYear: string;
    toYear: string;
  }
  
  export interface NonProfitInvolvement {
    company: string;
    position: string;
    city: string;
    fromYear: string;
    toYear: string;
  }
  
  export interface Recognition {
    topAccomplishments: string[];
    additionalLinks: string[];
  }
  
  export interface Expertise {
    title: string;
    content: string;
    rate: string;
  }
  
  export interface Video {
    id: number;
    videoLink: string;
    title: string;
    description: string;
    uploadedAt: string; 
  }
  
  export interface Subscription {
    
  }
  
  export interface Relative {
    id: number;
    user: number;
    firstName: string;
    lastName: string;
    yearOfBirth: number;
    relationship: string;
    createdAt: string;
  }
  