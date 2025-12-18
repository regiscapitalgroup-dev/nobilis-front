import React, { useEffect } from "react";
import { KTSVG } from "../../../../_metronic/helpers";
import { Modal } from "react-bootstrap-v5";
import { Category, ExperienceDetail } from "../../teamExperiences/models/ExperienceSummaryModel";
import { useHistory } from "react-router-dom";
import { EXPERIENCE_STATUS, EXPERIENCE_STATUS_LIST } from "../../teamExperiences/models/ExperienceStatus";
import { InfoHistory } from "./SectionInfoHistory";

type Props = {
    open: boolean;
    experience: ExperienceDetail;
    onClose: (close: boolean) => void;
};

const DetailExperienceDrawer:React.FC<Props> = ({ open, onClose, experience }) => {
    const history = useHistory()

    useEffect(() => {
    }, []);

    const handleCancel = () => {
        onClose(false);
    }

    return (<Modal show={open} 
        onHide={handleCancel}
        backdrop='static'
        dialogClassName='experience-detail-modal'
        contentClassName='experience-detail-content'
        backdropClassName='experience-detail-backdrop'
        className={`w-100`}>
        <div className={`admin-experience-details-container`}>
            {/* Header */}
            <div className="admin-experience-details-header">
                <h2 className="admin-experience-details-title">
                    Experience by { experience?.host?.firstName } { experience?.host?.lastName }
                </h2>
                <div className="rm-style-3 cursor-pointer" id='kt_drawer_request_membership_close' onClick={()=>onClose(false)}>
                    <KTSVG path="/media/svg/nobilis/waitlist/waitlist_nb_btn_icon_close_drawer.svg" className="rm-style-4" />
                </div>
                {/* <div className="admin-experience-details-close">
                </div> */}
            </div>

            {/* Action */}
            <div className="admin-experience-details-action">
                <button className="tap-add-experience-2-btn-secondary" onClick={()=>history.push(`/experience/edit/${experience.id}`)}>
                    <span>Edit</span>
                </button>
            </div>

            {/* Card */}
            <div className="admin-experience-details-card">
                <div className="admin-experience-details-user">
                    <div className="admin-experience-details-id d-flex flex-row">
                        <div className="w-50">#{experience.id}</div>
                        <div className="w-50 text-end">{EXPERIENCE_STATUS_LIST.map((item)=>item.id == experience.status ? (item.name) : null)}</div>
                    </div>

                    <div className="admin-experience-details-user-info">
                        <img className="admin-experience-details-avatar" src={experience?.host?.profilePicture}/>
                        <span className="admin-experience-details-name">
                            {experience?.host?.firstName} {experience?.host?.lastName}
                        </span>
                    </div>
                </div>

                <div className="admin-experience-details-contact">
                    <div className="admin-experience-details-field">
                        <span className="admin-experience-details-label">Email</span>
                        <span className="admin-experience-details-value">
                            {experience?.host?.email}
                        </span>
                    </div>

                    <div className="admin-experience-details-field">
                        <span className="admin-experience-details-label">Phone</span>
                        <span className="admin-experience-details-value">
                            {experience?.host?.phone ?? 'N/A'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Section */}
            <div className="admin-experience-details-summary">
                <div className="admin-experience-details-summary-header">
                    <div className="admin-experience-details-summary-tags">
                        {(experience?.categories ?? []).map((item:Category,index:number)=>(
                            <span key={`categories-detail-${index}`}>{item.name}</span>
                        ))}
                    </div>

                    <h4 className="admin-experience-details-summary-title">
                        {experience?.title}
                    </h4>
                </div>

                <p className="admin-experience-details-summary-description">
                    {experience?.idealAudience}
                </p>

                {/* Audience */}
                <div className="admin-experience-details-summary-audience">
                    <span>{Number(experience?.audienceType) == 2 ? 'Only Adults' : 'Family Friendly' }</span>
                    <span className="experience-preview-icon-default">
                        <KTSVG path='/media/svg/nobilis/info.svg' />
                    </span>
                </div>

                {/* Submitted by */}
                <div className="admin-experience-details-summary-submitted">
                    <span className="admin-experience-details-summary-label">
                        Submitted by
                    </span>

                    <div className="admin-experience-details-summary-user">
                        <img src={experience?.host?.profilePicture} />
                        <strong>{experience?.host?.firstName} {experience?.host?.lastName}</strong>
                        <span className="admin-experience-details-summary-badge">
                            Team
                        </span>
                    </div>

                    <div className="admin-experience-details-summary-meta">
                        <span>{experience?.host?.email}</span>
                        <span>|</span>
                        <span>{experience?.host?.phone ?? 'N/A'}</span>
                        <span>|</span>
                        <span>{experience?.host?.role ?? 'N/A'}</span>
                        <span>|</span>
                        <span>{experience?.host?.organization ?? 'N/A'}</span>
                    </div>

                    <div className="admin-experience-details-summary-footer">
                        <span>
                            Assignment: {experience?.host?.role ?? 'N/A'}
                        </span>

                        <div className="admin-experience-details-summary-actions">
                            <span className="icon-edit" />
                            <span className="icon-archive" />
                        </div>
                    </div>
                </div>
            </div>

            {experience.status == EXPERIENCE_STATUS.REJECTED ? (<InfoHistory items={[experience.rejectionInfo]} />) : null}

            {/* Footer */}
            <div className="admin-experience-details-footer">
                <div>&nbsp;</div>
                <button className="tap-add-experience-2-btn-main" onClick={()=>history.push(`/experience/detail/${experience.id}`)}>
                    <div>review the experience</div>
                    &nbsp;<KTSVG path='/media/svg/nobilis/teams_and_partner/waitlist_nb_btn_icon_host_experience_btn.svg' />
                </button>
            </div>
        </div>

    </Modal>);
}

export { DetailExperienceDrawer }