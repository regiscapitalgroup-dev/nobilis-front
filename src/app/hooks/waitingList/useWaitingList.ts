import { useState, useEffect } from 'react';
import { waitingListRequest } from '../../services/waitingListService';
import { WaitlistUser } from '../../pages/waitingList/components/WaitingListGrid';

export const useUseWaitinListRequest = (reload: number,status:number): {
    data: any | null;
    loading: boolean;
    error: Error | null;
} => {
    const [data, setData] = useState<WaitlistUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await waitingListRequest(status);
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
    }, [reload]);

    return { data, loading, error };
};
