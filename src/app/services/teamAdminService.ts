import apiClient from "../helpers/apiClient";

export const getListTeam = async (id:number,params:any) => {
    const response = await apiClient.get(`/moderation/teams/1/members/`, { params: params });
    return response.data;
};
