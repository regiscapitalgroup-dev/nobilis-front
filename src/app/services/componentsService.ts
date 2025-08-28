import apiClient from "../helpers/apiClient";

export const getCities = async (search?: string) => {
    const params = search && search.trim() ? { search: search.trim() } : undefined;
    const { data } = await apiClient.get('/cities/', { params });
    return data;
};

export const getLanguages = async (search?: string) => {
    const params = search && search.trim() ? { search: search.trim() } : undefined;
    const { data } = await apiClient.get('/languages/', { params });
    return data;
};