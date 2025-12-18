import apiClient from "../helpers/apiClient";
import { RecognitionModel } from "../pages/recognition/models/RecognitionModel";


export async function updateUserRecognition(
    payload: RecognitionModel,
    memberId?: string
) {

    const adaptedPayload = {
        top_accomplishments: payload.recognitions
            ? payload.recognitions.map(item => ({
                desc: item.description,
                url: item.link,
            }))
            : [],
        additional_links: payload.links
            ? payload.links.map(item => item.url)
            : [],
    }

    const { data } = await apiClient.patch(`/profile/recognition/${memberId}/`, adaptedPayload);
    return data;
}