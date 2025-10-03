import apiClient from "../helpers/apiClient";

export const getSupportContact = async () => {
    const { data } = await apiClient.get('/support-agents/');
    return data;
};