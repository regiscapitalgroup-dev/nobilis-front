import apiClient from "../helpers/apiClient";
import { handleApiError } from "../utils/handleApiError";

const Logout = () => {
    window.location.href = '/';
}

export const getListTeam = async (id:number,params:any) => {
    const response = await apiClient.get(`/moderation/teams/${id}/members/`, { params: params });
    return response.data;
};

export const getDetailTeam = async (teamId:number,membershipId:number) => {
    const response = await apiClient.get(`/moderation/teams/${teamId}/members/${membershipId}/`, {});
    return response.data;
};

export async function createTeam(data: any) {
    const response = await apiClient.post(`/my-team-invite/`, data,{ 
        headers: { 
            Accept: 'application/json',
            "Content-Type": "application/json",
        } 
    });
    return response.data;
}

export async function updateTeam(teamId:number,membershipId:number,data: any,formData: boolean=false) {
    let headers = {};
    if(formData){
        headers = { 
            Accept: 'application/json',
            "Content-Type": "multipart/form-data",
        }
    }else{
        headers = { 
            Accept: 'application/json',
            "Content-Type": "application/json",
        };
    }
    const response = await apiClient.put(`/moderation/teams/${teamId}/members/${membershipId}/`, data,{ headers: headers });
    return response.data;
}

export async function deleteTeam(teamId:number,membershipId:number) {
    const response = await apiClient.delete(`/moderation/teams/${teamId}/members/${membershipId}/`, { 
        headers: { 
            Accept: 'application/json',
            "Content-Type": "application/json",
        } 
    });
    return response.data;
}