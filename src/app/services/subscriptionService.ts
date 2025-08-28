import apiClient from "../helpers/apiClient";
import store from "../../setup/redux/Store";

export const subscribeToMembership = (membershipPayment: any): Promise<any> => {
    const token = store.getState().auth?.accessToken
    return new Promise((resolve, reject) => {
        apiClient.post('/members/subscriptions/create/', {
            paymentMethodId: membershipPayment.paymentMethodId,
            price_id: membershipPayment.price_id,
            email: membershipPayment.email,
            address: membershipPayment.address,
            country: membershipPayment.country,
            name: membershipPayment.name
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