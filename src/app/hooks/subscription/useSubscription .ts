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
    } catch (err) {
      setError(err as Error);
    }
  };

  return { subscriptionStatus, subscribe, error };
};
