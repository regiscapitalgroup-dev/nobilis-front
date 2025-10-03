import apiClient from "../helpers/apiClient";
import { ExpertiseModel } from "../pages/expertise/models/ExpertiseModel";


export async function updateUserExpertise(
    payload: ExpertiseModel
) {
    const { data } = await apiClient.put(`/users/expertise/`, payload, {
        headers: { Accept: 'application/json' },
    });
    return data;
}