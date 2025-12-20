import apiClient from "../helpers/apiClient";
import { BiographyModel } from "../pages/biography/models/BiographyModel";

export async function updateUserBiography(
    payload: BiographyModel,
    memberId?: string
) {

    const url = memberId
        ? `/admin-profile/biography/${memberId}/`
        : `/admin-profile/biography/`;
    const { data } = await apiClient.patch(url, payload);
    return data;
}