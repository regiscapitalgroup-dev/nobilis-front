export interface RecognitionItem {
    description: string;
    link?: string;
  }
  
  export interface RecognitionLink {
    url: string;
  }
  
  export interface RecognitionModel {
    recognitions: RecognitionItem[];
    links: RecognitionLink[];
  }
  