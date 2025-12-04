import apiClient from "../helpers/apiClient";

export const getSearchableMembers = async (where: string, keywords: string, category: string) => {
    const response = await apiClient.get(`/users/search/?where=${where}&key=${keywords}${category ? `&category=${category}` : ''}`);
    return response.data.results;
};


export const getCategoriesMembers = async () => {
    const response = await apiClient.get('/members/member-types/');
    return response.data.results;
};
