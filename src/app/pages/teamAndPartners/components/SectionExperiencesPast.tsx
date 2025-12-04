import { FC } from 'react'
import { KTSVG } from '../../../../_metronic/helpers';

interface PropsSectionExperiencesPast {
    listExperiencesPast?: any[];
}

const SectionExperiencesPast: FC<PropsSectionExperiencesPast> = ({ listExperiencesPast }) => {
    return (
        <div className="tap-host-secction-experiences-past-wrapper">
            <div className="tap-host-secction-experiences-past-title">
                Choose from past experiences
            </div>

            <div className="tap-host-secction-experiences-past-list">
                {(listExperiencesPast ?? []).map((exp, index) =>
                    (<div key={exp.id ?? index} className="tap-host-secction-experiences-past-card">

                        {/* LEFT IMAGE */}
                        <div className="tap-host-secction-experiences-past-img-wrapper">
                            <img className="tap-host-secction-experiences-past-img" src={exp.image} alt={exp.title}/>

                            <div className="tap-host-secction-experiences-past-img-overlay">
                                <div className="tap-host-secction-experiences-past-img-title">
                                    {exp.title}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT CONTENT */}
                        <div className="tap-host-secction-experiences-past-details">

                            {/* HOSTS */}
                            <div className="tap-host-secction-experiences-past-host-group">
                                {exp.hosts?.map((host, hIdx) => (
                                    <div key={hIdx} className="tap-host-secction-experiences-past-host">
                                        <img src={host.avatar} className="tap-host-secction-experiences-past-host-img" alt={host.name} />
                                        <div className="tap-host-secction-experiences-past-host-name">
                                            {host.name}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* INFO BOX */}
                            <div className="tap-host-secction-experiences-past-info-box">
                                <div className="tap-host-secction-experiences-past-info-row">
                                    <div className="tap-host-secction-experiences-past-info-item">
                                        <div className="tap-host-secction-experiences-past-icon icon-location">
                                            <KTSVG path='/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_location.svg' />&nbsp;
                                        </div>
                                        <div className="tap-host-secction-experiences-past-info-text">
                                            {exp.location}
                                        </div>
                                    </div>
                                    <div className="tap-host-secction-experiences-past-info-item">
                                        <div className="tap-host-secction-experiences-past-icon icon-calendar">
                                            <KTSVG path='/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_date.svg' />&nbsp;
                                        </div>
                                        <div className="tap-host-secction-experiences-past-info-text">
                                            {exp.date}
                                        </div>
                                    </div>
                                    <div className="tap-host-secction-experiences-past-info-item">
                                        <div className="tap-host-secction-experiences-past-icon icon-user">
                                            <KTSVG path='/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_person.svg' />&nbsp;
                                        </div>
                                        <div className="tap-host-secction-experiences-past-info-text">
                                            Max {exp.maxGuests} Guests
                                        </div>
                                    </div>
                                </div>

                                <div className="tap-host-secction-experiences-past-info-row">
                                    <div className="tap-host-secction-experiences-past-info-item">
                                        <div className="tap-host-secction-experiences-past-icon icon-dollar">
                                            <KTSVG path='/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_usd.svg' />&nbsp;
                                        </div>
                                        <div className="tap-host-secction-experiences-past-info-text">
                                            {exp.currency} {exp.pricePerGuest}/Guest
                                        </div>
                                    </div>
                                    <div className="tap-host-secction-experiences-past-info-item">
                                        <div className="tap-host-secction-experiences-past-icon icon-clock">
                                            <KTSVG path='/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_hour.svg' />&nbsp;
                                        </div>
                                        <div className="tap-host-secction-experiences-past-info-text">
                                            {exp.duration}
                                        </div>
                                    </div>
                                    <div className="tap-host-secction-experiences-past-info-item"></div>
                                </div>
                            </div>

                            {/* BOTTOM ACTIONS */}
                            <div className="tap-host-secction-experiences-past-actions">
                                <div className="tap-host-secction-experiences-past-guests">
                                    <div className="tap-host-secction-experiences-past-icon icon-user">
                                        <KTSVG path='/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_person.svg' />&nbsp;
                                    </div>
                                    <div className="tap-host-secction-experiences-past-guests-text">
                                        {exp.currentGuests}/{exp.maxGuests} guests
                                    </div>
                                </div>

                                <div className="tap-host-secction-experiences-past-buttons">
                                    <div className="tap-host-secction-experiences-past-btn-view cursor-pointer">
                                        <span>view</span>
                                    </div>
                                    <div className="tap-host-secction-experiences-past-btn-recreate cursor-pointer">
                                        recreate experience
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>)
                )}
            </div>
        </div>

    )
}

export { SectionExperiencesPast }