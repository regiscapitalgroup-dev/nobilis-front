import { useState, useEffect } from 'react';
import { waitingListRequest } from '../../services/waitingListService';
import { WaitlistUser } from '../../pages/waitingList/components/WaitingListGrid';

export const useUseWaitinListRequest = (reload: number,status:string,search:string,timeout:number): {
    data: any | null;
    loading: boolean;
    error: Error | null;
} => {
    const [data, setData] = useState<WaitlistUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        let timeoutId: any;

        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await waitingListRequest({status:status,search:search});
                if (isMounted) setData(data);
            } catch (err) {
                if (isMounted) setError(err as Error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        timeoutId = setTimeout(() => {
            fetchData();
        }, timeout);
        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, [reload]);

    return { data, loading, error };
};
