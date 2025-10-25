import apiClient from "../helpers/apiClient";
import { PartnerShipModel } from "../pages/public/landing/pages/Partners/models/PartnerShipModel";

export async function partnerCreate(
    payload: PartnerShipModel
) {
    const { data } = await apiClient.post(`partnership-enquiry/`, payload);
    return data;
}

export async function partnershipTypes(): Promise<any> {
    const { data } = await apiClient.get(`/partner-types/`,);
    return data?.results;
}