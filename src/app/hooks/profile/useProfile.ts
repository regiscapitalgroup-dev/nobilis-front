import { useState, useEffect } from 'react';
import { getProfileByUser } from '../../services/profileService';
import { FullUserProfileModel } from '../../pages/biography/models/FullUserProfileModel';

export const useUserProfile = (): {
    data: FullUserProfileModel | null;
    loading: boolean;
    error: Error | null;
} => {
    const [data, setData] = useState<FullUserProfileModel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getProfileByUser();
                if (isMounted) setData(data);
            } catch (err) {
                if (isMounted) setError(err as Error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();
        return () => {
            isMounted = false;
        };
    }, []);

    return { data, loading, error };
};
