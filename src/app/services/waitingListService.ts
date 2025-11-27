import apiClient from "../helpers/apiClient";

export interface ParamsWaitlist {
    status: string,
    search: string
}
export async function waitingListRequest(params:ParamsWaitlist) {
    const response = await apiClient.get(`/waitinglist/admin/`,{params: params});
    return response.data;
}

export async function acceptRequest(id: number) {
    const response = await apiClient.post(`/waitinglist/admin/${id}/approve/`);
    return response;
}

export async function rejectedRequest(id: number, data: any) {
    const response = await apiClient.post(`/waitinglist/admin/${id}/reject/`, data);
    return response.data;
}


export async function reasons() {
    const { data } = await apiClient.get(`/waitinglist/rejection-reasons/`,);
    return data?.results;
}

export async function membershipDetails(userId: number) {
    const { data } = await apiClient.get(`/waitinglist/admin/${userId}/`);
    return data;
}