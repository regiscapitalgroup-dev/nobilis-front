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


    const url = memberId
        ? `/profile/recognition/${memberId}/`
        : `/profile/recognition/`;
    const { data } = await apiClient.patch(url, adaptedPayload);
    return data;
}