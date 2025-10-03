import apiClient from "../helpers/apiClient";

export const getIntroductions = async () => {
    const { data } = await apiClient.get('/members/introductions/catalog/');
    return data?.results;
};