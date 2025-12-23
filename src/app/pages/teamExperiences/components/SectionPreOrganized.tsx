import { FC, useEffect, useState } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers';
import { getAudiences, getDurations, getExperiences } from '../../../services/teamExperienceService';
import { ExperienceSummary } from '../models/ExperienceSummaryModel';
import { GenericModel } from '../models/GenericModel';
import { useHistory } from 'react-router-dom';
import { formatDateShortIntl2 } from '../../../helpers/FormatDate';
import Pagination from '../../components/Pagination';

interface PropsSectionPreOrganized {
}

const SectionPreOrganized: FC<PropsSectionPreOrganized> = ({  }) => {
    const [durations, setDurations] = useState<GenericModel>([]);
    const [paginationData, setPaginationData] = useState<any>(null);
    const [listExperiences, setListExperiences] = useState<ExperienceSummary[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const limit = 5;
    const defaultImg = toAbsoluteUrl("/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_background_default.jpg")
    const history = useHistory()

    useEffect(() => {
        const fetchData = async () => {
            const duration = await getDurations();
            setDurations(duration.results)
            const experiences = await getExperiences({ limit, offset: 0 });
            setPaginationData(experiences);
            setListExperiences(experiences.results);
            setCurrentPage(1);
            setIsLoading(false);
        }
        fetchData();
    },[])

    const totalPages = paginationData
        ? Math.ceil(paginationData.count / limit)
        : 1;

    const getMaxPeople = (exp: {
        guestCapacityAdults?: string;
        guestCapacityChildren?: string;
        guestCapacityInfants?: string;
    }): number => {

        const fields = [
            exp.guestCapacityAdults,
            exp.guestCapacityChildren,
            exp.guestCapacityInfants,
        ];
        let total = 0;
        for (const field of fields) {
            if (!field) continue; // null, undefined, ''
            if (!field.includes("-")) continue;

            const [, maxStr] = field.split("-");
            const max = Number(maxStr);

            if (!isNaN(max)) {
            total += max;
            }
        }
        return total;
    }

    const handlePageChange = async (page: number) => {
        const offset = (page - 1) * limit;
        const experiences = await getExperiences({ limit, offset });
        setPaginationData(experiences);
        setListExperiences(experiences.results);
        setCurrentPage(page);
    };

    const goto = (route:string) => {
        history.push(route)
    }

    return (
        <div className="tap-host-secction-experiences-past-wrapper">
            <div className="tap-host-secction-experiences-past-title">
                select pre-organized  experience to lead
            </div>

            <div className="tap-host-info-box" style={{minWidth: 738}}>
                <div className="tap-host-info-text">
                    have an idea? <a href='https://www.joinnobilis.com' className="tap-host-link">Suggest Experience</a>
                </div>
            </div>
            <div className={`tap-host-secction-experiences-past-list ${isLoading ? '' : 'd-none'}`}>
                <div className='loader-experience'></div>
            </div>
            <div className="tap-host-secction-experiences-past-list">
                {(listExperiences ?? []).map((exp:ExperienceSummary, index:number) =>
                    (<div key={exp.id ?? index} className="tap-host-secction-experiences-past-card">

                        {/* LEFT IMAGE */}
                        <div className="tap-host-secction-experiences-past-img-wrapper">
                            <img className="tap-host-secction-experiences-past-img" src={exp.coverImage ?? defaultImg} alt={exp.title}/>

                            <div className="tap-host-secction-experiences-past-img-overlay">
                                <div className="tap-host-secction-experiences-past-img-title">
                                    {exp.title}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT CONTENT */}
                        <div className="tap-host-secction-experiences-past-details">

                            {/* HOSTS */}
                            <div className="tap-host-secction-experiences-lead">
                                <div className="tap-host-secction-experiences-lead__title">NOBILIS</div>
                                <div className="tap-host-secction-experiences-lead__subtitle">Operated by Nobilis partners</div>
                            </div>

                            {/* INFO BOX */}
                            <div className="tap-host-secction-experiences-past-info-box">
                                <div className="tap-host-secction-experiences-past-info-row">
                                    <div className="tap-host-secction-experiences-past-info-item">
                                        <div className="tap-host-secction-experiences-past-icon icon-location">
                                            <KTSVG path='/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_location.svg' />&nbsp;
                                        </div>
                                        <div className="tap-host-secction-experiences-past-info-text">
                                            {exp.locationAddress}
                                        </div>
                                    </div>
                                    <div className="tap-host-secction-experiences-past-info-item">
                                        <div className="tap-host-secction-experiences-past-icon icon-calendar">
                                            <KTSVG path='/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_date.svg' />&nbsp;
                                        </div>
                                        <div className="tap-host-secction-experiences-past-info-text">
                                            {exp?.dates?.length>0 ? formatDateShortIntl2(exp?.dates[0]?.start) : null}
                                        </div>
                                    </div>
                                    <div className="tap-host-secction-experiences-past-info-item">
                                        <div className="tap-host-secction-experiences-past-icon icon-user">
                                            <KTSVG path='/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_person.svg' />&nbsp;
                                        </div>
                                        <div className="tap-host-secction-experiences-past-info-text">
                                            Max {getMaxPeople(exp)} Guests
                                        </div>
                                    </div>
                                </div>

                                <div className="tap-host-secction-experiences-past-info-row">
                                    <div className="tap-host-secction-experiences-past-info-item">
                                        <div className="tap-host-secction-experiences-past-icon icon-dollar">
                                            <KTSVG path='/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_usd.svg' />&nbsp;
                                        </div>
                                        <div className="tap-host-secction-experiences-past-info-text">
                                            $ {exp.pricePerGuest}&nbsp;/&nbsp;Guest
                                        </div>
                                    </div>
                                    <div className="tap-host-secction-experiences-past-info-item">
                                        <div className="tap-host-secction-experiences-past-icon icon-clock">
                                            <KTSVG path='/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_hour.svg' />&nbsp;
                                        </div>
                                        <div className="tap-host-secction-experiences-past-info-text">
                                            {exp.duration} {(durations ?? []).map((i)=>(i.id == exp.durationType) ? i.name : '')}
                                        </div>
                                    </div>
                                    <div className="tap-host-secction-experiences-past-info-item"></div>
                                </div>
                            </div>

                            {/* BOTTOM ACTIONS */}
                            <div className="tap-host-secction-experiences-past-actions justify-content-end">
                                <div className="tap-host-secction-experiences-past-buttons">
                                    <div role='button' onClick={()=>goto(`/experience/detail/${exp.id}`)} className="tap-host-secction-experiences-past-btn-view cursor-pointer">
                                        <span>view</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>)
                )}
            </div>
            {paginationData && (<div className='tap-flex-center mt-5'>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>)}
        </div>

    )
}

export { SectionPreOrganized }