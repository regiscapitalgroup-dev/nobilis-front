import { FC, useEffect, useRef, useState } from 'react'
import { useLayout } from '../../../../_metronic/layout/core'
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers'
import { Link } from 'react-router-dom'
import { SectionExperiencesPast } from './SectionExperiencesPast'

const TeamAndPartnerHostPage: FC = () => {
    const { config, setLayout } = useLayout()
    const restoreRef = useRef(config)
    const [selectedOption, setSelectedOption] = useState('new');
    const listExperiencesPast = [
        {
            "id": 1,
            "title": "Sailing Experience Through One Of The Most Beautiful River In Lithuania",
            "image": toAbsoluteUrl("/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_background_default.jpg"),
            "hosts": [
                {
                    "name": "You",
                    "avatar": toAbsoluteUrl("/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_profile_default.png")
                },
                {
                    "name": "Kristina Adam",
                    "avatar": toAbsoluteUrl("/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_profile_default.png")
                }
            ],
            "location": "Vilnius, Lithuania",
            "date": "30 August 2026",
            "maxGuests": 12,
            "pricePerGuest": 2000,
            "currency": "USD",
            "duration": "6 Hour",
            "currentGuests": 6,
            "actions": {
                "view": true,
                "recreate": true
            }
        },
        {
            "id": 2,
            "title": "Exclusive Wine Tasting at the Old Manor Cellars",
            "image": toAbsoluteUrl("/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_background_default.jpg"),
            "hosts": [
                {
                    "name": "You",
                    "avatar": toAbsoluteUrl("/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_profile_default.png")
                },
                {
                    "name": "Alex Morgan",
                    "avatar": toAbsoluteUrl("/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_profile_default.png")
                }
            ],
            "location": "Paris, France",
            "date": "12 March 2027",
            "maxGuests": 20,
            "pricePerGuest": 350,
            "currency": "EUR",
            "duration": "4 Hour",
            "currentGuests": 14,
            "actions": {
                "view": true,
                "recreate": true
            }
        },
        {
            "id": 3,
            "title": "Sunset Meditation and Tea Ritual by the Ocean",
            "image": toAbsoluteUrl("/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_background_default.jpg"),
            "hosts": [
                {
                    "name": "You",
                    "avatar": toAbsoluteUrl("/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_profile_default.png")
                }
            ],
            "location": "Bali, Indonesia",
            "date": "06 June 2026",
            "maxGuests": 25,
            "pricePerGuest": 120,
            "currency": "USD",
            "duration": "2 Hour",
            "currentGuests": 22,
        }
    ];


    useEffect(() => {
        restoreRef.current = config

        setLayout({
            ...config,
            header: { ...config.header, display: true },
            aside: { ...config.aside, display: true },
            toolbar: { ...config.toolbar, display: false },
            footer: { ...config.footer, display: true },
        })

        return () => setLayout(restoreRef.current)
    }, [])

    const changeRadio = (e: any) => {
        try {
            setSelectedOption(e.target.value);
        } catch (error) {
            console.error("Error changing radio button:", error);
        }
    }

    const renderContentOptionSelected = () => {
        switch (selectedOption) {
            case 'new':
                return (<div className="tap-host-button">
                    <Link to="/team-and-partners/experience/1" className="tap-host-button-text tap-flex-center">
                        HOST EXPERIENCE &nbsp;<KTSVG path='/media/svg/nobilis/teams_and_partner/waitlist_nb_btn_icon_host_experience_btn.svg' />
                    </Link>
                </div>);
            case 'past':
                return (<SectionExperiencesPast listExperiencesPast={listExperiencesPast} />);
            case 'lead':
                return (<div className="tap-host-footer-text">You have selected to lead a pre-organized experience.</div>);// aqui va la seleccion de opcion select pre organized to lead
            default:
                return null;
        }
    }

    return (
        <div className="tap-host-wrapper">
            <div className="tap-host-container">

                <div className="tap-host-title-block">
                    <div className="tap-host-title">Your Invitation to Nobilis</div>
                </div>

                <div className="tap-host-section">
                    <div className="tap-host-step">step 1/3</div>
                    <div className="tap-host-divider"></div>

                    <div className="tap-host-description-group">
                        <div className="tap-host-description-block">
                            <div className="tap-host-description-title">Host experience</div>
                            <div className="tap-host-description-text">
                                In Nobilis, every experience is more than an event—it is your gift to the community.
                                What feels ordinary to you may be extraordinary to others. Your team may assist, but your presence
                                as host is essential. Share your world, inspire connections, and create lasting moments.”
                            </div>
                        </div>

                        <img className="tap-host-image" src={toAbsoluteUrl("/media/svg/nobilis/teams_and_partner/team_and_partner_img.png")} />
                    </div>

                    <div className="tap-host-info-box">
                        <div className="tap-host-info-text">
                            Please read <a href='https://www.joinnobilis.com' className="tap-host-link">Nobilis Experience Guide</a> before continuing
                        </div>
                    </div>

                    <div className="tap-host-options">
                        <div className="tap-host-option-card flex-column flex-md-row">

                            {/* Radio 1 */}
                            <label className="tap-host-option w-100 w-lg-auto m-2 m-lg-0">
                                <input onChange={(e) => changeRadio(e)}
                                    type="radio"
                                    name="experienceType"
                                    value="new"
                                    className="tap-host-radio-input"
                                    defaultChecked
                                />
                                <div className="tap-host-radio">
                                    <div className="tap-host-radio-outer"></div>
                                    <div className="tap-host-radio-inner"></div>
                                </div>
                                <div className="tap-host-option-label">Create New Experience</div>
                            </label>

                            {/* Radio 2 */}
                            <label className="tap-host-option w-100 w-lg-auto m-2 m-lg-0">
                                <input onChange={(e) => changeRadio(e)}
                                    type="radio"
                                    name="experienceType"
                                    value="past"
                                    className="tap-host-radio-input"
                                />
                                <div className="tap-host-radio">
                                    <div className="tap-host-radio-outer"></div>
                                    <div className="tap-host-radio-inner"></div>
                                </div>
                                <div className="tap-host-option-label">Create from Past Experience</div>
                            </label>

                            {/* Radio 3 */}
                            <label className="tap-host-option w-100 w-lg-auto m-2 m-lg-0">
                                <input onChange={(e) => changeRadio(e)}
                                    type="radio"
                                    name="experienceType"
                                    value="lead"
                                    className="tap-host-radio-input"
                                />
                                <div className="tap-host-radio">
                                    <div className="tap-host-radio-outer"></div>
                                    <div className="tap-host-radio-inner"></div>
                                </div>
                                <div className="tap-host-option-label">Select Pre-Organized to Lead</div>
                            </label>

                        </div>
                    </div>

                </div>

                <div className="tap-host-footer">
                    {renderContentOptionSelected()}
                </div>

            </div>
        </div>

    )
}

export { TeamAndPartnerHostPage }
