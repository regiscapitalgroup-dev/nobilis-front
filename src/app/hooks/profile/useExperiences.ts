// src/hooks/useMemberships.ts
import { useState, useEffect } from 'react';
import {  getUserExperiences } from '../../services/profileService';
import { ExperienceFooterModel } from '../../../_metronic/layout/components/models/ExperienceModel';


export const useUserExperiences = () => {
    const [data, setData] = useState<ExperienceFooterModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fecth = async () => {
            try {
                setLoading(true);
                const data = await getUserExperiences();
                if (isMounted) {
                    setData(data);
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

        fecth();
        return () => {
            isMounted = false;
        };
    }, []);

    return { data, loading, error };
};
