import apiClient from "../helpers/apiClient";
import { handleApiError } from "../utils/handleApiError";

const Logout = () => {
    window.location.href = '/';
}

export async function getReasons() {
    try {
        const response = await apiClient.get(`/experiences/admin/rejection-reasons/`, {});
        return response.data;
    } catch (error) {
        handleApiError(error, {
            onUnauthorized: Logout,
            onServerError: Logout,
        });
    }
}

export async function declineExperience(id:number,data: any) {
    try {
        const response = await apiClient.patch(`/experiences/admin/experiences/${id}/reject/`, data, {});
        return response.data;
    } catch (error) {
        handleApiError(error, {
            onUnauthorized: Logout,
        });
    }
}

export async function approveExperience(id:number,data: any) {
    try {
        const response = await apiClient.post(`/experiences/admin/experiences/${id}/approve/`, data,{ });
        return response.data;
    } catch (error) {
        handleApiError(error, {
            onUnauthorized: Logout,
        });
    }
}

export async function getExperiencesByStatus(params:any={}) {
    try {
        const response = await apiClient.get(`/experiences/admin/list/`, { params: params });
        return response.data;
    } catch (error) {
        handleApiError(error, {
            onUnauthorized: Logout,
        });
    }
}

/* temporalmente solo para cambiar el status */
export async function updateExperienceStatus(id:number,data: any) {
    try {
        const response = await apiClient.patch(`/experiences/${id}/`,data,{ 
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