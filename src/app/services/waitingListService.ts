import apiClient from "../helpers/apiClient";

export async function waitingListRequest() {
    const response = await apiClient.get(`/waitinglist/admin/`,);
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