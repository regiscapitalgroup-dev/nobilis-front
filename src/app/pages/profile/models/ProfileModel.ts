export interface SocialProfile {
    platform_name: string;
    profile_url: string;
  }
  
  export interface UserProfile {
    introduction_headline: string;
    alias_title: string;
    profile_picture: File | string;
    birthday: string;
    phone_number: string;
    street: string;
    city: string;
    postal_code: string;
    languages: string[];
    social_media_profiles?: SocialProfile[];
  }
  