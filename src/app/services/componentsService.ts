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

export const getRelations = async () => {
    const { data } = await apiClient.get('/relatives/relationships/');
    return data;
};


export const getIndustries = async (search?: string) => {
    const params = search && search.trim() ? { search: search.trim() } : undefined;
    const { data } = await apiClient.get('/catalog/industries/');
    return data;
};

export const getProfessionalInterests = async () => {
    const { data } = await apiClient.get('/interests/');
    return data;
};

export const getHobbies = async () => {
    const { data } = await apiClient.get('catalog/hobbies/');
    return data;
};

export const getPersonalInterests = async () => {
    const { data } = await apiClient.get('/personal-interests/');
    return data;
};

export const getClubes = async (search?: string) => {
    const { data } = await apiClient.get('catalog/clubs/');
    return data;
};