import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap-v5'
import { KTSVG } from '../../../../_metronic/helpers';
import { useHistory } from 'react-router-dom';
import { InfoHistory, InfoHistoryItem } from '../../experiencesAdmin/components/SectionInfoHistory';
import { getDetailExperience } from '../../../services/teamExperienceService';
import { ExperienceDetail, ExperienceSummary, RejectionInfo } from '../../teamExperiences/models/ExperienceSummaryModel';

type Props = {
    experienceId: number;
    open: boolean;
    onCancel?: () => void;
    onLoad?: (isloaded:boolean) => void;
}

export const DeclineReasonsModal: React.FC<Props> = ({ onCancel, onLoad, open, experienceId }) => {
    const [reasons, setReasons] = useState<any[]>([])
    const history = useHistory()

    useEffect(()=>{
        if(!experienceId) return

        const fetchData = async () => {
            let reasons_:ExperienceDetail = await getDetailExperience(experienceId);
            setReasons([reasons_.rejectionInfo]);
        }
        fetchData();
    },[open])

    const onEdit = () => {
        history.push(`/experience/edit/${experienceId}`);
    }

    return (<Modal show={open} centered className='decline-experience-modal'>
        <div className="decline-experience">
            <h2 className="decline-experience__title">
                Decline reasons
            </h2>
            
            <InfoHistory items={reasons}/>

            <div className="decline-experience__actions">
                <button className="decline-experience__btn decline-experience__btn--secondary" onClick={onCancel}>
                    Cancel
                </button>

                <button className="decline-experience__btn decline-experience__btn--primary" onClick={onEdit}>
                    Edit
                    &nbsp;<KTSVG path='/media/svg/nobilis/vector02.svg' />
                </button>
            </div>
        </div>
    </Modal>)
}
