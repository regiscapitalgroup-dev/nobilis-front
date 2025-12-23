import { FC } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../../../../_metronic/helpers'
import { Props } from '../../../AddExperiencePage'
import { ErrorMessage, useFormikContext } from 'formik';

const Step1: FC<Props> = ({ onNextStep }) => {
    const formik = useFormikContext();

    return (
        <div className="tap-add-experience-wrapper">
            <div className="tap-add-experience-container">
                <div className="tap-add-experience-title-box">
                    <div className="tap-add-experience-title">Add experience</div>
                </div>

                <div className="tap-add-experience-section">
                    <div className="tap-add-experience-step">step 1/3</div>
                    <div className="tap-add-experience-divider"></div>

                    <div className="tap-add-experience-block">
                        <div className="tap-add-experience-subblock">
                            <div className="tap-add-experience-subtitle">Before You Begin</div>

                            <div className="tap-add-experience-text">
                                Nobilis is a member-led community defined by personal engagement,
                                trust, and excellence.
                                <br />If you are submitting an experience, your presence is
                                required—whether as the main host or a meaningful participant. Your
                                involvement sets the tone and reflects the integrity of the
                                invitation.
                                <br />
                                Now, curate something unforgettable. Share your world with peers who
                                value authenticity, discretion, and brilliance.
                            </div>
                        </div>
                        <img className="tap-add-experience-image" src={toAbsoluteUrl("/media/svg/nobilis/teams_and_partner/team_and_partner_img.png")} />
                    </div>

                    <div className="tap-add-experience-guide-box">
                        <div className="tap-add-experience-guide-text">
                            <span>Please read </span>
                            <span className="tap-add-experience-guide-link">
                                Nobilis Experience Guide
                            </span>
                            <span> before continuing</span>
                        </div>
                    </div>

                    <div className="tap-host-options">
                        <div className="tap-host-option-card">

                            {/* Radio 1 */}
                            <label className="tap-host-option">
                                <input
                                    type="radio"
                                    name="experienceType"
                                    value="new"
                                    className="tap-host-radio-input"
                                    checked={formik.values.experienceType === "new"}
                                    onChange={formik.handleChange}
                                />
                                <div className="tap-host-radio">
                                    <div className="tap-host-radio-outer"></div>
                                    <div className="tap-host-radio-inner"></div>
                                </div>
                                <div className="tap-host-option-label">Add new experience</div>
                            </label>

                            {/* Radio 2 */}
                            <label className="tap-host-option">
                                <input disabled
                                    type="radio"
                                    name="experienceType"
                                    value="past"
                                    className="tap-host-radio-input"
                                    checked={formik.values.experienceType === "past"}
                                    onChange={formik.handleChange}
                                />
                                <div className="tap-host-radio">
                                    <div className="tap-host-radio-outer"></div>
                                    <div className="tap-host-radio-inner"></div>
                                </div>
                                <div className="tap-host-option-label">Add experience based on past experience</div>
                            </label>

                            {/* Radio 3 */}
                            <label className="tap-host-option">
                                <input disabled
                                    type="radio"
                                    name="experienceType"
                                    value="lead"
                                    className="tap-host-radio-input"
                                    checked={formik.values.experienceType === "lead"}
                                    onChange={formik.handleChange}
                                />
                                <div className="tap-host-radio">
                                    <div className="tap-host-radio-outer"></div>
                                    <div className="tap-host-radio-inner"></div>
                                </div>
                                <div className="tap-host-option-label">Experience you lead</div>
                            </label>
                        </div>
                    </div>
                    <ErrorMessage name="experienceType" component="div" className="tap-add-experience-text text-danger" />
                </div>

                <div className="tap-add-experience-footer">
                    <div className="tap-add-experience-2-btn-main" role='button' onClick={async () => await onNextStep()}>
                        <div className="tap-host-button-text tap-flex-center">
                            Create experience &nbsp;<KTSVG path='/media/svg/nobilis/teams_and_partner/waitlist_nb_btn_icon_host_experience_btn.svg' />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export { Step1 }
