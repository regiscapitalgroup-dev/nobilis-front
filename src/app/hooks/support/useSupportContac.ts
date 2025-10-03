import { useState, useEffect } from 'react';
import { getSupportContact } from '../../services/supportService';

export const useSupporContact = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSupportContact();
        if (isMounted) setData(Array.isArray(data) ? data[0] : []);
      } catch (err) {
        if (isMounted) setError(err as Error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetch();
    return () => { isMounted = false; };
  }, []);

  return { data, loading, error };
};
