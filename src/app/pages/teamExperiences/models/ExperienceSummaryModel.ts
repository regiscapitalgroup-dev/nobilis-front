export interface ExperienceDetail {
  id: number;
  title: string;
  description: string | null;
  itinerary: string;
  whatIsIncluded: string;
  host: HostInfo;
  coverImage: string;
  galleryImages: GalleryImage[];
  optionalVideoLink: string | null;
  status: number;
  createdAt: string;
  confidentialityType: number | null;
  categories: Category[];
  audienceType: string;
  adultAudience: boolean;
  idealAudience: string | null;
  duration: number;
  durationType: string;
  locationAddress: string;
  arrivalNotes: string;
  availabilityType: string;
  dates: ExperienceDate[];
  pricePerGuest: string;
  payoutDetails: any | null;
  enhancements: Enhancement[];
  guestCapacityAdults: string;
  guestCapacityChildren: string;
  guestCapacityInfants: string;
  minimalAge: number | null;
  requiresIdVerification: boolean;
  houseRules: string | null;
  cancellationPolicy: string | null;
  importantInformationGuest: string;
  public: boolean;
  requiresSubscription: boolean;
  beneficiaries: Beneficiary[];
  beneficiaryCheck: boolean;
  beneficiaryForProfit: boolean;
  confidentialityCheck: boolean;
  policyCancelationCheck: boolean;
  hostPresence: string;
  additionalTeamMembersDetails: any[];
  allowedGuestsDetails: any[];
  rejectionInfo: RejectionInfo
}

export interface ExperienceShort {
  id: number;
  title: string;
  coverImage:string; // falta
  submittedBy:Submitted;
  typeDisplay:string;
  dateUploaded:string;
  daysLeft: String;
  status: number;
}

export interface ExperienceSummary {
  id: number;
  title: string;
  host: HostInfo;
  guestCapacityAdults: string;
  guestCapacityChildren: string;
  guestCapacityInfants: string;
  coverImage: string;
  locationAddress: string;
  dates: ExperienceDate[];
  pricePerGuest: string;
  duration: number;
  durationType: string;
  status: number;
  availabilityType: string;
  createdAt: string;
  currentGuests: string;
}

export interface RejectionInfo {
  isRejected: boolean;
  reason: string;
  note: string;
}

export interface Beneficiary {
  id: number;
  name: string;
  description: string;
}

export interface HostInfo {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
  profilePicture: string;
}

export interface GalleryImage {
  id: number;
  image: string;
}

export interface Submitted {
  id: number;
  name: string;
  image: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface ExperienceDate {
  id: number;
  start: string; // ISO datetime
  end: string;   // ISO datetime
}

export interface Enhancement {
  id: number;
  name: string;
  price: string;
}
