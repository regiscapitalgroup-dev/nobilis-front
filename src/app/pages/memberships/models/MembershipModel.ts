export interface MembershipDetailModel {

    id: string,
    title: string,
    color: string,
    pricing : string
    priceYear: string,
    interval: string,
    price: string,
    priceStr: string,
    priceDescription: string
    features: string[],
    requirements: string[],
    stripePlanId: string, 
    shipping: number
}