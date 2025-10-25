import apiClient from "../helpers/apiClient";

export async function waitingListRequest(): Promise<any> {
    const response = await apiClient.get(`/waitinglist/admin/`,);
    return response.data;
}

export async function acceptRequest(id: number): Promise<any> {
    const response = await apiClient.post(`/waitinglist/admin/${id}/approve/`);
    return response;
}

export async function rejectedRequest(id: number, data: any): Promise<any> {
    const response = await apiClient.post(`/waitinglist/admin/${id}/reject/`, data);
    return response.data;
}


export async function reasons(): Promise<any> {
    const { data } = await apiClient.get(`/waitinglist/rejection-reasons/`,);
    return data?.results;
}