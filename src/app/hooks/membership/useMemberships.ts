// src/hooks/useMemberships.ts
import { useState, useEffect } from 'react';
import { getAllMemberships } from '../../services/membershipService';


export const useMemberships = (isActive: boolean) => {
  const [memberships, setMemberships] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchMemberships = async () => {
      try {
        setLoading(true);
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

    if (isActive) {
      fetchMemberships();
    }

    return () => {
      isMounted = false;
    };
  }, [isActive]);

  return { memberships, loading, error };
};
