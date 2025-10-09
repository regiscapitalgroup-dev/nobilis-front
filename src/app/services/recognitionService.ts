import apiClient from "../helpers/apiClient";
import { RecognitionModel } from "../pages/recognition/models/RecognitionModel";


export async function updateUserRecognition(
    payload: RecognitionModel
) {

    const adaptedPayload = {
        recognition: payload.recognitions
            ? payload.recognitions.map(item => ({
                desc: item.description,
                url: item.link,
            }))
            : [],
        additional_links: payload.links
            ? payload.links.map(item => item.url)
            : [],
    }

    const { data } = await apiClient.put(`/profile/recognition/`, adaptedPayload);
    return data;
}