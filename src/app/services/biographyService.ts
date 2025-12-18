import apiClient from "../helpers/apiClient";
import { BiographyModel } from "../pages/biography/models/BiographyModel";

export async function updateUserBiography(
    payload: BiographyModel,
    memberId?: string
) {

    const { data } = await apiClient.patch(`admin-profile/biography/${memberId}/`, payload);
    return data;
}