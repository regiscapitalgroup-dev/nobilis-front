import { useState, useEffect } from 'react';
import { getAllMemberships } from '../../services/membershipService';
import { MembershipDetailModel } from '../../pages/memberships/models/MembershipModel';


export const useMemberships = () => {
  const [memberships, setMemberships] = useState<MembershipDetailModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchMemberships = async () => {
      try {
        const data = await getAllMemberships();
        if (isMounted) {
          setMemberships(data.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchMemberships();
    return () => {
      isMounted = false;
    };
  }, []);

  return { memberships, loading, error };
};
