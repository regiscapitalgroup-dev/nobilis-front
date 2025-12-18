import { FC, useEffect, useRef, useState } from 'react'
import { useLayout } from '../../../_metronic/layout/core'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { SectionExperiencesPast } from './components/SectionExperiencesPast'
import { SectionPreOrganized } from './components/SectionPreOrganized'

const HostExperiencePage: FC = () => {
    const { config, setLayout } = useLayout()
    const restoreRef = useRef(config)
    const [selectedOption, setSelectedOption] = useState('');
    const history = useHistory();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const opc = params.get("opc") ?? 'new';
    
    useEffect(() => {
        restoreRef.current = config
        setLayout({
            ...config,
            header: { ...config.header, display: true },
            aside: { ...config.aside, display: true },
            toolbar: { ...config.toolbar, display: false },
            footer: { ...config.footer, display: true },
        })
        /* validamos si tiene una opcion seleccionada */
        if(opc){
            setSelectedOption(opc);
        }
        return () => setLayout(restoreRef.current)
    }, [])

    const changeRadio = (e: any) => {
        try {
            setSelectedOption(e.target.value);
            setParam("opc",e.target.value);
        } catch (error) {
            console.error("Error changing radio button:", error);
        }
    }

    const setParam = (key:string, value:string) => {
        const params = new URLSearchParams(location.search);
        params.set(key, value);

        history.push({
            pathname: location.pathname,
            search: params.toString(),
        });
    };

    const renderContentOptionSelected = () => {
        switch (selectedOption) {
            case 'new':
                return (<Link to="/my-experience" className="tap-add-experience-2-btn-main">
                    <div className="tap-host-button-text tap-flex-center">
                        HOST EXPERIENCE &nbsp;<KTSVG path='/media/svg/nobilis/teams_and_partner/waitlist_nb_btn_icon_host_experience_btn.svg' />
                    </div>
                </Link>);
            case 'past':
                return (<SectionExperiencesPast />);
            case 'lead':
                return (<SectionPreOrganized />);// aqui va la seleccion de opcion select pre organized to lead
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
                                    checked={selectedOption === "new"} 
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
                                    checked={selectedOption === "past"} 
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
                                    checked={selectedOption === "lead"} 
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

export { HostExperiencePage }
