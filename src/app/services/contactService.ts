import apiClient from "../helpers/apiClient";
import { ContactModel } from "../pages/public/landing/models/ContactModel";

export async function contactCreate(
    payload: ContactModel
) {
    const { data } = await apiClient.post(`contact/
`, payload);
    return data;
}


export async function getContactNobilis() {
    const { data } = await apiClient.get('/members/introductions/catalog/');
    return data;
}