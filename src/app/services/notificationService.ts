import apiClient from "../helpers/apiClient";

export async function getNotificationsRequestWL() {
    const { data } = await apiClient.get('/notifications/');
    return data?.results;
}

export async function readNotification(id:number) {
    const { data } = await apiClient.post(`notifications/${id}/read/`);
    return data?.results;
}
