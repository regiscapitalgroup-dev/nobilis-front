import { useHistory } from "react-router-dom";
import apiClient from "../helpers/apiClient";
import { handleApiError } from "../utils/handleApiError";

const Logout = () => {
    window.location.href = '/';
}

export async function getCategories() {
    try {
        const response = await apiClient.get(`/experiences/categories/`, {});
        return response.data;
    } catch (error) {
        handleApiError(error, {
            onUnauthorized: Logout,
        });
    }
}

export async function getAudiences() {
    try {
        const response = await apiClient.get(`/experiences/audiences/`, {});
        return response.data;
    } catch (error) {
        handleApiError(error, {
            onUnauthorized: Logout,
        });
    }
}

export async function getDurations() {
    try {
        const response = await apiClient.get(`/experiences/duration-types/`, {});
        return response.data;
    } catch (error) {
        handleApiError(error, {
            onUnauthorized: Logout,
        });
    }
}

export async function getConfidentialityLevels() {
    try {
        const response = await apiClient.get(`/experiences/confidentiality-levels/`, {});
        return response.data;
    } catch (error) {
        handleApiError(error, {
            onUnauthorized: Logout,
        });
    }
}

export async function getBeneficiaries() {
    try {
        const response = await apiClient.get(`/experiences/beneficiaries/`, {});
        return response.data;
    } catch (error) {
        handleApiError(error, {
            onUnauthorized: Logout,
        });
    }
}

export async function getMyTeamMembers(search: string) {
    try {
        const response = await apiClient.get(`/my-team/search/`, { params: { key: search } });
        return response.data;
    } catch (error) {
        handleApiError(error, {
            onUnauthorized: Logout,
        });
    }
}

export async function getUsersSubscribed(search: string) {
    try {
        const response = await apiClient.get(`/users/search/subscribed/`, { params: { key: search } });
        return response.data;
    } catch (error) {
        handleApiError(error, {
            onUnauthorized: Logout,
        });
    }
}

/* experiencias */

export async function createExperience(data: any) {
    try {
        const response = await apiClient.post(`/experiences/`, data,{ 
            headers: { 
                Accept: 'application/json',
                "Content-Type": "application/json",
            } 
        });
        return response.data;
    } catch (error) {
        handleApiError(error, {
            onUnauthorized: Logout,
        });
    }
}

export async function addImagesToExperience(id: number, formData: FormData) {
    try {
        const response = await apiClient.patch(`/experiences/${id}/`, formData, { 
            headers: { 
                Accept: 'application/json',
                "Content-Type": "multipart/form-data",
            } 
        });
        return response.data;
    } catch (error) {
        handleApiError(error, {
            onUnauthorized: Logout,
        });
    }
}

export async function updateExperience(id:number,data: any) {
    try {
        const response = await apiClient.put(`/experiences/${id}/`,data,{ 
            headers: { 
                Accept: 'application/json',
                "Content-Type": "application/json",
            } 
        });
        return response.data;
    } catch (error) {
        handleApiError(error, {
            onUnauthorized: Logout,
        });
    }
}

export async function getDetailExperience(id:number) {
    try {
        const response = await apiClient.get(`/experiences/${id}/`, {});
        return response.data;
    } catch (error) {
        handleApiError(error, {
            onUnauthorized: Logout,
        });
    }
}

export async function getExperiences(params:any={}) {
    try {
        const response = await apiClient.get(`/experiences/`, { params: params });
        return response.data;
    } catch (error) {
        handleApiError(error, {
            onUnauthorized: Logout,
        });
    }
}

export async function deleteExperience(id:number) {
    try {
        const response = await apiClient.delete(`/experiences/${id}/`, {});
        return response.data;
    } catch (error) {
        handleApiError(error, {
            onUnauthorized: Logout,
        });
    }
}