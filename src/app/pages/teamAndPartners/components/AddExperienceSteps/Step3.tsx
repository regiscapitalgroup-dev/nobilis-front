import { FC } from 'react'
import { Props } from '../../AddExperiencePage'
import { KTSVG } from '../../../../../_metronic/helpers'
import { ErrorMessage, useFormikContext } from 'formik'
import { showErrorAlert } from '../../../../helpers/alert'

const Step3:FC<Props> = ({ onBackStep }) => {
    const formik = useFormikContext();

    return (
        <div className="tap-add-experience-3-container">
            {/* HEADER */}
            <div className="tap-add-experience-3-header">
                <div className="tap-add-experience-3-title">
                    Your Invitation to Nobilis
                </div>
            </div>

            {/* STEP + DIVIDER + CONTENT BLOCK */}
            <div className="tap-add-experience-3-step-block">
                <div className="tap-add-experience-3-step">step 3/3</div>
                <div className="tap-add-experience-3-divider" />
                <div className="tap-add-experience-3-section">
                    {/* CONFIDENTIALITY */}
                    <div className="tap-add-experience-3-section-group">
                        <div className="tap-add-experience-3-section-label">
                            Confidentiality & Media Use
                        </div>
                        <div className="tap-add-experience-3-section-description">
                            Discretion forms the bedrock of Nobilis, ensuring a trusted space for Members.
                            All interactions, whether in events, experiences, mastermind circles, or public
                            forums, adhere to our universal confidentiality: information shared within the
                            community must not be disclosed externally without explicit, unanimous consent.
                        </div>
                    </div>
                    {/* RADIO OPTIONS */}
                    <div className="tap-add-experience-2-radio-row flex-column">
                        <div className={`tap-add-experience-2-radio-card w-100 ${formik.values.confidentialityType === "noMedia" ? 'tap-add-experience-2-radio-card--selected' : ''}`}>
                            <label className="tap-host-option p-6 w-100 flex-row">
                                <input
                                    type="radio"
                                    name="confidentialityType"
                                    value="noMedia"
                                    className="tap-host-radio-input"
                                    checked={formik.values.confidentialityType === "noMedia"}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <div className="tap-host-radio">
                                    <div className="tap-host-radio-outer"></div>
                                    <div className="tap-host-radio-inner"></div>
                                </div>
                                <div className="tap-add-experience-3-radio-content">
                                    <div className="title">No Media (Default)</div>
                                    <div className="subtitle">
                                        Photography, video, or recordings are not permitted.
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div className={`tap-add-experience-2-radio-card w-100 ${formik.values.confidentialityType === "limitedMedia" ? 'tap-add-experience-2-radio-card--selected' : ''}`}>
                            <label className="tap-host-option p-6 w-100">
                                <input
                                    type="radio"
                                    name="confidentialityType"
                                    value="limitedMedia"
                                    className="tap-host-radio-input"
                                    checked={formik.values.confidentialityType === "limitedMedia"}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <div className="tap-host-radio">
                                    <div className="tap-host-radio-outer"></div>
                                    <div className="tap-host-radio-inner"></div>
                                </div>
                                <div className="tap-add-experience-3-radio-content">
                                    <div className="title">Limited Media</div>
                                    <div className="subtitle">
                                        Permits capture only with opt-in consent from all guests involved,
                                        strictly for personal, non-shared use. No online posting or distribution.
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div className={`tap-add-experience-2-radio-card w-100 ${formik.values.confidentialityType === "openMedia" ? 'tap-add-experience-2-radio-card--selected' : ''}`}>
                            <label className="tap-host-option p-6 w-100">
                                <input
                                    type="radio"
                                    name="confidentialityType"
                                    value="openMedia"
                                    className="tap-host-radio-input"
                                    checked={formik.values.confidentialityType === "openMedia"}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <div className="tap-host-radio">
                                    <div className="tap-host-radio-outer"></div>
                                    <div className="tap-host-radio-inner"></div>
                                </div>
                                <div className="tap-add-experience-3-radio-content">
                                    <div className="title">Open Media</div>
                                    <div className="subtitle">
                                        Allows professional photographers or approved teams to capture and share
                                        content, subject to guest opt-in, content previews, and Nobilis review.
                                        All media must comply with confidentiality and avoid sensitive disclosures.
                                    </div>
                                </div>
                            </label>
                        </div>
                        <ErrorMessage name={`confidentialityType`} component="div" className="tap-add-experience-text text-danger" />
                    </div>
                    {/* CONFIRMATION CHECKBOX */}
                    <label className="tap-add-experience-2-checkbox-row" for="policyCheck">
                        <div className="tap-add-experience-2-checkbox">
                            <input id="policyCheck" className="tap-add-experience-2-checkbox-box" name='policyCheck' value={formik.values.policyCheck} onChange={formik.handleChange} onBlur={formik.handleBlur} type="checkbox" />
                        </div>
                        <div className="tap-add-experience-2-checkbox-text">
                            I confirm that I have read and understand the Confidentiality and Media use
                            Policy and acknowledge my responsibilities within the Nobilis Community.
                        </div>
                    </label>
                    <ErrorMessage name={`policyCheck`} component="div" className="tap-add-experience-text text-danger" />
                    {/* CANCELLATION SECTION */}
                    <div className="tap-add-experience-3-section-group">
                        <div className="tap-add-experience-3-section-label">
                            Cancellation Policy
                        </div>

                        <div className="tap-add-experience-3-section-description">
                            Cancellation affects attendees and the community trust — please plan carefully.
                        </div>
                    </div>
                    {/* CANCELLATION CHECKBOX */}
                    <label className="tap-add-experience-2-checkbox-row" for="policyCancelationCheck">
                        <div className="tap-add-experience-2-checkbox">
                            <input id="policyCancelationCheck" className="tap-add-experience-2-checkbox-box" name='policyCancelationCheck' value={formik.values.policyCancelationCheck} onChange={formik.handleChange} onBlur={formik.handleBlur} type="checkbox" />
                        </div>
                        <div className="tap-add-experience-2-checkbox-text">
                            I confirm that I have read, understand, and agree to comply with
                            Nobilis’s Host Cancellation Policy, including any financial obligations,
                            required attendee refunds, and potential impact on my standing within the
                            community.
                        </div>
                    </label>
                    <ErrorMessage name={`policyCancelationCheck`} component="div" className="tap-add-experience-text text-danger" />
                </div>
            </div>
            {/* FOOTER BUTTONS */}
            <div className="tap-add-experience-3-footer">
                <div role='button' onClick={onBackStep} className="tap-add-experience-3-btn-secondary">
                    back
                </div>
                <div className="tap-add-experience-3-footer-right">
                    <div className="tap-add-experience-3-btn-secondary" onClick={()=>{showErrorAlert({title: 'Comming Soon',message: '',confirmButtonText: 'OK'});}}>save for later</div>

                    <button type='submit' className="tap-add-experience-3-btn-main tap-flex-center" onClick={()=>{showErrorAlert({title: 'Comming Soon',message: '',confirmButtonText: 'OK'});}}>
                        <span>submit</span>
                        &nbsp;<KTSVG path='/media/svg/nobilis/teams_and_partner/waitlist_nb_btn_icon_host_experience_btn.svg' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export { Step3 }