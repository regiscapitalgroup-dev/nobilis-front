export interface Plan {
    id: string;
    error?: string;
    product: string;
}


export interface StripeProduct {
    active: boolean;
    attributes: string[];
    created: number;
    default_price: string;
    description: string;
    id: string;
    images: string[];
    livemode: boolean;
    marketing_features: string[];
    metadata: Record<string, string>;
    name: string;
    object: string;
    package_dimensions: null; 
    shippable: boolean | null;
    statement_descriptor: string | null;
    tax_code: string | null;
    type: string; 
    unit_label: string | null;
    updated: number;
    url: string | null;
  }
  

export interface SubscriptionModel {
    id: string;
    status: "active" | "inactive" | "canceled" | "trialing" | "past_due" | "unpaid";
    cancelAtPeriodEnd: boolean;
    canceledAt: string | null;
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
    trialEnd: string | null;
    plan: Plan;
    defaultPaymentMethod: string | null;    
}