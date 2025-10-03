import apiClient from "../helpers/apiClient";
import { RecognitionModel } from "../pages/recognition/models/RecognitionModel";


export async function updateUserRecognition(
    payload: RecognitionModel
) {
    const { data } = await apiClient.put(`/users/profile/`, payload, {
        headers: { Accept: 'application/json' },
    });
    return data;
}