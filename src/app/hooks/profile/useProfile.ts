import { useState, useEffect, useCallback } from 'react';
import { getProfileByUser } from '../../services/profileService';
import { FullUserProfileModel } from '../../pages/biography/models/FullUserProfileModel';

export const useUserProfile = (): {
    data: FullUserProfileModel | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>; 
} => {
    const [data, setData] = useState<FullUserProfileModel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getProfileByUser();
            setData(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};