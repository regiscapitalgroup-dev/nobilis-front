import { FC, useEffect, useState } from 'react'
import { Props } from '../../../AddExperiencePage'
import { KTSVG } from '../../../../../../_metronic/helpers'
import { ErrorMessage, useFormikContext } from 'formik'
import { EXPERIENCE_STATUS } from '../../../models/ExperienceStatus'
import { validateShowButtonActions } from '../utils'

const Step3:FC<Props> = ({ onBackStep, haveErrors, onLoad, onLoadMessage, onPause, catalogs }) => {
    const formik = useFormikContext();

    const handleSaveForLater = async () => {
        await formik.setFieldValue("status",EXPERIENCE_STATUS.DRAFT);
        let haveErrs:boolean = await haveErrors();
        if(!haveErrs){
            await formik.submitForm();
        }
    }
    
    const handleSaveDefinitive = async () => {
        await formik.setFieldValue("status",EXPERIENCE_STATUS.PENDING);
        let haveErrs:boolean = await haveErrors();
        if(!haveErrs){
            await formik.submitForm();
        }
    }

    return (
        <div className="tap-add-experience-3-container">
            {/* HEADER */}
            <div className="tap-add-experience-3-header">
                <div className="tap-add-experience-3-title">
                    { formik?.values?.id > 0 ? 'Edit experience' : 'Your Invitation to Nobilis' }
                </div>
            </div>

            {/* STEP + DIVIDER + CONTENT BLOCK */}
            <div className="tap-add-experience-3-step-block">
                <div className={`tap-add-experience-3-step ${formik?.values?.id > 0 ? 'd-none' : ''}`}>step 3/3</div>
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
                        {(catalogs?.confidentialities ?? []).map((conf,index)=>{
                            return (<div key={`radio-confidential-levels-${index}`} className={`tap-add-experience-2-radio-card w-100 ${formik.values.confidentiality_type == conf.id ? 'tap-add-experience-2-radio-card--selected' : ''}`}>
                                <label className="tap-host-option p-6 w-100 flex-row">
                                    <input
                                        type="radio"
                                        name="confidentiality_type"
                                        value={conf.id}
                                        className="tap-host-radio-input"
                                        checked={formik.values.confidentiality_type == conf.id}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <div className="tap-host-radio">
                                        <div className="tap-host-radio-outer"></div>
                                        <div className="tap-host-radio-inner"></div>
                                    </div>
                                    <div className="tap-add-experience-3-radio-content">
                                        <div className="title">{conf.name}</div>
                                        <div className="subtitle">
                                            Photography, video, or recordings are not permitted.
                                        </div>
                                    </div>
                                </label>
                            </div>);
                        })}
                        <ErrorMessage name={`confidentiality_type`} component="div" className="tap-add-experience-text text-danger" />
                    </div>
                    {/* CONFIRMATION CHECKBOX */}
                    <label className="tap-add-experience-2-checkbox-row" htmlFor="confidentiality_check">
                        <div className="tap-add-experience-2-checkbox">
                            <input id="confidentiality_check" className="tap-add-experience-2-checkbox-box" name='confidentiality_check' checked={formik.values.confidentiality_check} onChange={formik.handleChange} onBlur={formik.handleBlur} type="checkbox" />
                        </div>
                        <div className="tap-add-experience-2-checkbox-text">
                            I confirm that I have read and understand the Confidentiality and Media use
                            Policy and acknowledge my responsibilities within the Nobilis Community.
                        </div>
                    </label>
                    <ErrorMessage name={`confidentiality_check`} component="div" className="tap-add-experience-text text-danger" />
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
                    <label className="tap-add-experience-2-checkbox-row" htmlFor="policy_cancelation_check">
                        <div className="tap-add-experience-2-checkbox">
                            <input id="policy_cancelation_check" className="tap-add-experience-2-checkbox-box" name='policy_cancelation_check' checked={formik.values.policy_cancelation_check} onChange={formik.handleChange} onBlur={formik.handleBlur} type="checkbox" />
                        </div>
                        <div className="tap-add-experience-2-checkbox-text">
                            I confirm that I have read, understand, and agree to comply with
                            Nobilis’s Host Cancellation Policy, including any financial obligations,
                            required attendee refunds, and potential impact on my standing within the
                            community.
                        </div>
                    </label>
                    <ErrorMessage name={`policy_cancelation_check`} component="div" className="tap-add-experience-text text-danger" />
                </div>
            </div>
            {/* FOOTER BUTTONS */}
            <div className="tap-add-experience-2-footer">
                <div role='button' onClick={onBackStep} className="tap-add-experience-2-btn-secondary">
                    back
                </div>
                <div className="tap-add-experience-2-footer-right">
                    <button type="button" className={`tap-add-experience-2-btn-secondary ${validateShowButtonActions('paused',formik)}`} onClick={()=>onPause(true)}>
                        <div>Pause Experience</div>
                    </button>
                    <button className={`tap-add-experience-2-btn-secondary ${validateShowButtonActions('draft',formik)}`} onClick={handleSaveForLater}>
                        save for later
                    </button>

                    <button type='button' className="tap-add-experience-2-btn-main tap-flex-center" onClick={handleSaveDefinitive} disabled={formik.isSubmitting || !formik.isValid}>
                        <span>submit</span>
                        &nbsp;<KTSVG path='/media/svg/nobilis/teams_and_partner/waitlist_nb_btn_icon_host_experience_btn.svg' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export { Step3 }