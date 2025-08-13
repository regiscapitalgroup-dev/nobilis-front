// src/hooks/useMemberships.ts
import { useState, useEffect } from 'react';
import { getCities } from '../../services/componentsService';

export const useCitiesField = (search?: string) => {
  const [cities, setCities] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCities = async () => {
      try {
        setLoading(true);
        setError(null);
        const term = search?.trim() ? search.trim() : undefined;
        const data = await getCities(term);
        if (isMounted) setCities(Array.isArray(data) ? data : []);
      } catch (err) {
        if (isMounted) setError(err as Error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCities();
    return () => { isMounted = false; };
  }, [search]);

  return { cities, loading, error };
};
