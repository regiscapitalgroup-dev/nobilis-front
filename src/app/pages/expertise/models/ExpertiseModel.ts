export interface ExpertiseItem {
    area: string;
    description: string;
    pricing: {
      currency: string;
      amount: number;
      unit: string;
    };
  }
  
  export interface ExpertiseModel {
    expertise: ExpertiseItem[];
  }
  