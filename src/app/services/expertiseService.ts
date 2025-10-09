import apiClient from "../helpers/apiClient";


export async function updateUserExpertise(
    payload: any
) {
    const { data } = await apiClient.put(`profile/expertise/`, payload);
    return data;
}