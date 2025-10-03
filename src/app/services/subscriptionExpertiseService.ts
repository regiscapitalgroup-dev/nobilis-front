import apiClient from "../helpers/apiClient";
import store from "../../setup/redux/Store";

export const subscribeToExpert = (payload: any): Promise<any> => {
    const token = store.getState().auth?.accessToken
    return new Promise((resolve, reject) => {
        apiClient.post('/members/subscriptions/create/', {
            paymentMethodId: payload.paymentMethodId,
            price_id: payload.price_id,
            email: payload.email,
            address: payload.address,
            country: payload.country,
            name: payload.name
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            resolve(response.data);
        })
        .catch(error => {
            reject(error);
        });
    });
};