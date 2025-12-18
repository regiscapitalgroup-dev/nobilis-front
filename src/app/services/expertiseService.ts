import apiClient from "../helpers/apiClient";


export async function updateUserExpertise(
    payload: any,
    memberId?: string
) {
    const { data } = await apiClient.put(`profile/expertise/${memberId}/`, payload);
    return data;
}