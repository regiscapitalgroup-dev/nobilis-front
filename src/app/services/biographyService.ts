import apiClient from "../helpers/apiClient";
import { BiographyModel } from "../pages/biography/models/BiographyModel";

export async function updateUserBiography(
    payload: BiographyModel
) {

    const { data } = await apiClient.put(`admin-profile/biography/`, payload);
    return data;
}