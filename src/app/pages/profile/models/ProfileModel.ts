export interface SocialProfile {
    platform_name: string;
    profile_url: string;
  }
  
  export interface UserProfile {
    name: string;
    email: string;
    introduction_headline: string;
    alias_title: string;
    profile_picture: File | string | null ;
    birthday: string;
    phone_number: string;
    city: string;
    languages: string[];
    social_media_profiles?: SocialProfile[];
    prefered_email: boolean;
    preferred_phone: boolean;
  }
  