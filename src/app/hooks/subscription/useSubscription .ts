import { useState } from 'react';
import { subscribeToMembership } from '../../services/subscriptionService';
import { IMembershipPayment } from '../../pages/memberships/components/MembershipPaymentHelper';

export const useSubscription = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);

  const subscribe = async (membershipPayment: IMembershipPayment) => {
    try {
      const response = await subscribeToMembership(membershipPayment);
      setSubscriptionStatus(response.status);
      setError(null)
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return { subscriptionStatus, subscribe, error };
};
