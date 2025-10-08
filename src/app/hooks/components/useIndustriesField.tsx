import { useState, useEffect } from 'react';
import { getIndustries } from '../../services/componentsService';

export const useIndustriesField = () => {
  const [collection, setCollection] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getIndustries();
        if (isMounted) setCollection(Array.isArray(response) ? response : []);
      } catch (err) {
        if (isMounted) setError(err as Error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetch();
    return () => { isMounted = false; };
  }, []);

  return { collection, loading, error };
};
