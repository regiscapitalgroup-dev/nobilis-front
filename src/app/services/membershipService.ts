import apiClient from "../helpers/apiClient";

export const getAllMemberships = async () => {
    const response = await apiClient.get('/members/nobilis/plans/');
    return response.data;
};

