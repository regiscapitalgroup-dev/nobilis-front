import { FC, useEffect, useRef, useState } from 'react'
import { useLayout } from '../../../_metronic/layout/core'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { useHistory, useParams } from 'react-router-dom'
import { ExperiencePreviewGallery } from './components/ExperiencePreviewGallery'
import { ExperiencePreviewInviteCarousel } from './components/ExperiencePreviewInviteCarousel'
import { getAudiences, getDetailExperience, getDurations } from '../../services/teamExperienceService'
import { GenericModel } from '../teamExperiences/models/GenericModel'
import { ExperienceShort, ExperienceDetail } from '../teamExperiences/models/ExperienceSummaryModel'
import { formatDateShortIntl2 } from '../../helpers/FormatDate'
import { SectionInfoTabs } from './components/SectionInfoTabs'
import { LoaderOverlay } from '../../hooks/loader/LoaderOverlay'
import { DeclineExperienceModal } from '../experiencesAdmin/components/DeclineExperienceModal'
import { useConfirmAction } from '../../hooks/utils/useConfirmAction'
import { approveExperience, getExperiencesByStatus, updateExperienceStatus } from '../../services/adminExperiencesService'
import { handleApiError } from '../../utils/handleApiError'
import { showErrorAlert } from '../../helpers/alert'
import { EXPERIENCE_STATUS } from '../teamExperiences/models/ExperienceStatus'

const ExperiencePreviewPage: FC = () => {
    const { config, setLayout } = useLayout()
    const restoreRef = useRef(config)
    const history = useHistory()
    const { id } = useParams();
    const [durations, setDuration] = useState<GenericModel>([]);
    const [audiences, setAudiences] = useState<GenericModel>([]);
    const [experience, setExperience] = useState<ExperienceDetail>({});
    const [experiences, setExperiences] = useState<ExperienceShort[]>([]);
    const [isLoader, setIsLoader] = useState(true);
    const [messageLoader, setMessageLoader] = useState("Loading...");
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const placeholder = toAbsoluteUrl('/media/svg/nobilis/experience/experience-preview.jpg');
    const [openDeclineModal, setOpenDeclineModal] = useState(false);
    const confirm = useConfirmAction()

    useEffect(() => {
        if(!id){
            history.goBack();
            return;
        }
        restoreRef.current = config
        setLayout({
            ...config,
            header: {...config.header, display: false },
            toolbar: {...config.toolbar, display: false },
            aside: {...config.aside, display: false },
            footer: {...config.footer, display: true },
            main: {
                ...config.main,
                body: {...config.main?.body, class: 'app-blank'},
            },
        })
        document.body.classList.add('bg-experience-preview');
        document.getElementById('kt_footer')?.classList.add('bg-experience-preview');

        const fetchData = async () => {
            const audience = await getAudiences();
            setAudiences(audience.results)
            const duration = await getDurations();
            setDuration(duration.results)
            const experience_ = await getDetailExperience(id);
            setExperience(experience_);
            const experiences_ = await getExperiencesByStatus({status: 1})
            let filter = (experiences_.results ?? []).filter((item)=>item.id != id);
            setExperiences(filter);
            setIsLoader(false);
        }
        fetchData();
    }, [])

    useEffect(() => {
        // aquí vuelves a cargar la info del experience
        const fetchData = async () => {
            setIsLoader(true);
            const experience_ = await getDetailExperience(id);
            setExperience(experience_);
            const experiences_ = await getExperiencesByStatus({status: 1})
            let filter = (experiences_.results ?? []).filter((item)=>item.id != id);
            setExperiences(filter);
            setIsLoader(false);
        }
        fetchData();
    }, [id]);

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

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
        video.play();
        setIsPlaying(true);
        } else {
        video.pause();
        setIsPlaying(false);
        }
    };

    const havemp4 = (link:string) => {
        return experience.optionalVideoLink?.includes('.mp4') ? true : false;
    }

    const onApprovedHandle = async () => {
        const response = await confirm({
            title: 'Confirm',
            message: `Do you want to approve the experience '${experience.title}'?`,
        });
        if (response) {
            try {
                setIsLoader(true);
                if(experience.status == EXPERIENCE_STATUS.PENDING){
                    let isApproved = await updateExperienceStatus(experience.id,{ status: EXPERIENCE_STATUS.PRE_LAUNCH });
                }else if(experience.status == EXPERIENCE_STATUS.PRE_LAUNCH){
                    let isApproved = await approveExperience(experience.id,{});
                }
                setIsLoader(false);
                history.goBack();
                showErrorAlert({ title: '', message: isApproved?.detail ?? 'Experience approved successfully.' });
            } catch (error) {
                handleApiError(error, {
                    onServerError: ()=>showErrorAlert({ title: 'Error', message: 'Error approving the experience. Please try again later.' }),
                });
            }
        }
    }

    return (<div className='tap-flex-center'>
        <div className="experience-preview-wrapper">
            <div className='experience-preview-wrapper__img'>
                <img className="" src={experience.coverImage ?? placeholder} alt={'exp.title'}/>
            </div>
            {/* header */}
            {/* <div className="experience-preview-leadbar">
                <div className='experience-preview-leadbar-content'>
                    <div className="experience-preview-leadbar-textblock">
                        <div className="experience-preview-leadbar-title">
                        Pre-Organized Experience Lead
                        </div>
                        <div className="experience-preview-leadbar-subtitle">
                        A rare privilege to Lead and inspire Nobilis Community. If confirmed, rewarded 1.000 Credits.
                        </div>
                    </div>

                    <div className="experience-preview-leadbar-btn-secondary">
                        <div className="experience-preview-leadbar-btn-text tap-flex-center w-100" onClick={()=>history.goBack()}>
                            <div>close</div>
                            &nbsp;<KTSVG path='/media/svg/nobilis/teams_and_partner/waitlist_nb_btn_icon_host_experience_btn.svg' />
                        </div>
                    </div>

                    <div className="experience-preview-leadbar-btn-primary">
                        <div className="experience-preview-leadbar-btn-text-primary tap-flex-center w-100">
                            <div>request to Lead</div>
                            &nbsp;<KTSVG path='/media/svg/nobilis/vector02.svg' />
                        </div>
                    </div>
                </div>
            </div> */}
            <div className={`experience-preview-leadbar`}>
                <div className='experience-preview-leadbar-content'>
                    <div className="experience-preview-leadbar-btn-secondary" onClick={()=>history.goBack()}>
                        <div className="experience-preview-leadbar-btn-text tap-flex-center w-100">
                            <div>go back</div>
                        </div>
                    </div>

                    <div className="experience-preview-leadbar-textblock">
                        <div className="experience-preview-leadbar-subtitle">
                        Experience By {experience?.host?.firstName} {experience?.host?.lastName}
                        </div>
                    </div>
                    
                    <div className={`experience-preview-leadbar-btn-secondary ${experience.status == EXPERIENCE_STATUS.PENDING || experience.status == EXPERIENCE_STATUS.PRE_LAUNCH ? 'd-flex' : 'd-none'}`} onClick={()=>setOpenDeclineModal(true)}>
                        <div className="experience-preview-leadbar-btn-text tap-flex-center w-100">
                            <div>Decline</div>
                            &nbsp;<KTSVG path='/media/svg/nobilis/teams_and_partner/waitlist_nb_btn_icon_host_experience_btn.svg' />
                        </div>
                    </div>

                    <div className={`experience-preview-leadbar-btn-primary ${experience.status == EXPERIENCE_STATUS.PENDING || experience.status == EXPERIENCE_STATUS.PRE_LAUNCH ? 'd-flex' : 'd-none'}`} onClick={onApprovedHandle}>
                        <div className="experience-preview-leadbar-btn-text-primary tap-flex-center w-100">
                            <div>Approve</div>
                            &nbsp;<KTSVG path='/media/svg/nobilis/vector02.svg' />
                        </div>
                    </div>
                </div>
            </div>
            <div className="experience-preview-content">

                {/* LEFT CONTENT BLOCK */}
                <div className="experience-preview-left">
                    <div className="experience-preview-header">
                        <div className="experience-preview-badge">
                            <div className='line-svg'>
                                <KTSVG path='/media/svg/nobilis/teams_and_partner/mask-success-line-icon.svg' />
                            </div>
                            &nbsp;&nbsp;New&nbsp;&nbsp;
                            <div className='line-svg'>
                                <KTSVG path='/media/svg/nobilis/teams_and_partner/mask-success-line-icon.svg' />
                            </div>
                        </div>

                        <h1 className="experience-preview-title">
                            {experience?.title}
                        </h1>

                        <div className="experience-preview-categories">
                            {(experience?.categories ?? []).map((cat,index)=>(
                                <span key={`item-category-${index}`} className="experience-preview-category">{cat.name}</span>
                            ))}
                        </div>
                    </div>

                    <div className="experience-preview-description-block">
                        <p className="experience-preview-description">
                            {experience?.idealAudience}
                        </p>

                        <div className="experience-preview-family">
                            <span className="experience-preview-family-text">{audiences.map((item)=>(item.id == experience?.audienceType ? item.name : ''))}</span>
                            <span className="experience-preview-icon-default">
                                <KTSVG path='/media/svg/nobilis/info.svg' />
                            </span>
                        </div>
                    </div>
                </div>

                {/* BOTTOM INFO ROW */}
                <div className="experience-preview-bottom">
                    <div className="experience-preview-info-left">
                        <div className="experience-preview-invited">
                            <span className="experience-preview-invited-label">Invited by</span>
                            <div className="experience-preview-invited-item">
                                <img src={experience?.host?.profilePicture} />
                                <span>{experience?.host?.firstName} {experience?.host?.lastName}</span>
                            </div>
                        </div>

                        <div className="experience-preview-details">
                            <div className="experience-preview-detail">
                                <span className="experience-preview-icon-18">
                                    <KTSVG path='/media/svg/nobilis/location-white.svg' />
                                </span>
                                <span className='labels'>{experience?.locationAddress}</span>
                            </div>

                            <div className="experience-preview-detail">
                                <span className="experience-preview-icon-18">
                                    <KTSVG path='/media/svg/nobilis/calendar-white.svg' />
                                </span>
                                <div className='labels'>
                                    {(experience.dates ?? []).map((item,index)=>(
                                        <span key={`date-${index}`}>
                                            { formatDateShortIntl2(item.end) == formatDateShortIntl2(item.start) ?
                                                formatDateShortIntl2(item.start) :
                                                `${formatDateShortIntl2(item.start)} / ${formatDateShortIntl2(item.end)}`
                                            }
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="experience-preview-detail">
                                <span className="experience-preview-icon-18">
                                    <KTSVG path='/media/svg/nobilis/people-white.svg' />
                                </span>
                                <span className='labels'>Max {getMaxPeople(experience)} Guests</span>
                            </div>

                            <div className="experience-preview-detail">
                                <span className="experience-preview-icon-18">
                                    <KTSVG path='/media/svg/nobilis/clock-white.svg' />
                                </span>
                                <span className='labels'>{experience?.duration} {(durations ?? []).map((i)=>(i.id == experience.durationType) ? i.name : '')}</span>
                            </div>

                            <div className="experience-preview-detail">
                                <span className="experience-preview-icon-18">
                                    <KTSVG path='/media/svg/nobilis/currency-white.svg' />
                                </span>
                                <span className='labels'>$&nbsp;{experience.pricePerGuest}&nbsp;/&nbsp;Guest</span>
                            </div>
                        </div>
                    </div>

                    <div className="experience-preview-actions d-none">
                        <button className="experience-preview-btn-primary">RSVP</button>

                        <button className="experience-preview-btn-secondary">
                            add to wishlist
                            <span className="experience-preview-icon icon-heart"></span>
                        </button>
                    </div>
                </div>

                {/* carrousel */}
                <ExperiencePreviewGallery images={experience.galleryImages ?? []} eventsScroll={experience?.galleryImages?.length>3} />

                {/* Tabs descripciones */}
                <SectionInfoTabs experience={experience} />

                {/* video */}
                <div className={`experience-preview-image-block tap-flex-center ${havemp4(experience.optionalVideoLink) ? 'd-flex' : 'd-none'}`}>
                    <video className={`experience-preview-image-block-mainimg`} 
                        ref={videoRef} controls={false}
                        onClick={togglePlay} 
                        onPause={() => setIsPlaying(false)}
                        onPlay={() => setIsPlaying(true)}
                        src={experience.optionalVideoLink} />
                    {!isPlaying && (<div className="experience-preview-image-block-icon" onClick={togglePlay}>
                        <span className="experience-preview-icon-79">
                            <KTSVG path='/media/svg/nobilis/play-white.svg' />
                        </span>
                        {/* <div className="experience-preview-image-block-icon-shape"></div> */}
                    </div>)}
                </div>

                <div className="experience-preview-invite-by">
                    <div className="experience-preview-name">
                        <KTSVG path='/media/svg/nobilis/mark-292928.svg' />
                        {experience?.host?.firstName ?? ''} {experience?.host?.lastName ?? ''}
                    </div>
                    <div className="experience-preview-invites">Invites You</div>
                    <div className="experience-preview-outline-box"></div>
                </div>
                {/* carrousel 2 */}
                <ExperiencePreviewInviteCarousel items={experiences} eventsScroll={false} />
            </div>
        </div>
        <LoaderOverlay visible={isLoader} message={messageLoader} />
        <DeclineExperienceModal open={openDeclineModal} onLoad={setIsLoader} experienceId={experience.id} onCancel={()=>{setOpenDeclineModal(false)}} />
    </div>)
}

export { ExperiencePreviewPage }