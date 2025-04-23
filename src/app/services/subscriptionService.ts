import { IMembershipPayment } from "../pages/memberships/components/MembershipPaymentHelper";
import apiClient from "../helpers/apiClient";
import store from "../../setup/redux/Store";

export const subscribeToMembership = (membershipPayment: IMembershipPayment): Promise<any> => {

    const token = store.getState().auth?.accessToken
    return new Promise((resolve, reject) => {
        apiClient.post('/members/subscriptions/create/', {
            paymentMethodId: membershipPayment.paymentMethodId,
            price_id: membershipPayment.price_id
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