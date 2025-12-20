import apiClient from "../helpers/apiClient";


export async function updateUserExpertise(
    payload: any,
    memberId?: string
) {

    const url = memberId
        ? `/profile/expertise/${memberId}/`
        : `/profile/expertise/`;
    const { data } = await apiClient.put(url, payload);
    return data;
}