import { useState, useEffect } from 'react';
import { getNotificationsRequestWL } from '../../services/notificationService';

export const useUserNotifications = (): {
    data: any | null;
    loading: boolean;
    error: Error | null;
} => {
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getNotificationsRequestWL();
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
