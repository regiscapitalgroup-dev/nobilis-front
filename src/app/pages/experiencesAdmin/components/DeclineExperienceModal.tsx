import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap-v5'
import { KTSVG } from '../../../../_metronic/helpers';
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup'
import { declineExperience, getReasons } from '../../../services/adminExperiencesService';
import { GenericModel } from '../../teamExperiences/models/GenericModel';
import { useHistory } from 'react-router-dom';
import { showErrorAlert } from '../../../helpers/alert';
import { handleApiError } from '../../../utils/handleApiError';

type Props = {
    experienceId: number;
    open: boolean;
    onCancel?: () => void;
    onLoad?: (isloaded:boolean) => void;
}

export const DeclineExperienceModal: React.FC<Props> = ({ onCancel, onLoad, open, experienceId }) => {
    const [reasons, setReasons] = useState<any[]>([])
    const history = useHistory()

    useEffect(()=>{
        const fetchData = async () => {
            let reasons_ = await getReasons();
            setReasons(reasons_.results);
        }
        fetchData();
    },[])

    const initialValues = {
        rejection_reason_id: 0,
        rejection_note: "",
    };

    const validationSchema = Yup.object({
        rejection_reason_id: Yup.number().required("Selected an option").min(1,'Selected an option'),
        rejection_note: Yup.string().required("Experience name is required").max(100, "Max 100 characters"),
    });

    const textareaRef = useRef(null);
    const handleTextAreaInput = (e) => {
        const el = textareaRef.current;
        el.style.height = "auto"; // resetea para medir bien
        const lineHeight = 20;    // ajusta según tu font-size
        const maxHeight = 5 * lineHeight;
        el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";
    };

    const handleSubmit = async (values) => {
        try {
            onLoad(true);
            let isDecline = await declineExperience(experienceId,values);
            onLoad(false);
            history.goBack();
            showErrorAlert({ title: '', message: isDecline.detail ?? 'The experience has been declined successfully.' });
        } catch (error) {
            handleApiError(error, {
                onServerError: ()=>showErrorAlert({ title: 'Error', message: 'Error declining the experience. Please try again later.' }),
            });
        }
    }

    return (<Modal show={open} centered className='decline-experience-modal'>
        <Formik initialValues={initialValues} validationSchema={validationSchema} validateOnMount={true} onSubmit={handleSubmit}>
            {(formik) => {

                const onCancelHandle = () => {
                    formik.resetForm({
                        values: {
                            rejection_reason_id: 0,
                            rejection_note: "",
                        }
                    });
                    onCancel();
                }

                return (<Form>
                    <div className="decline-experience">
                        <h2 className="decline-experience__title">
                            Decline Experience
                        </h2>

                        <p className="decline-experience__description">
                            Are you sure you want to decline this experience?
                            <br />
                            Clarify the reason for the Member to be fixed.
                        </p>

                        <div className="decline-experience__form w-100">
                            {/* Select reason */}
                            <div className="decline-experience__field">
                                <label className="decline-experience__label">
                                    Decline reason
                                </label>

                                <div className="decline-experience__select">
                                    <select name="rejection_reason_id" value={formik.values.rejection_reason_id} onChange={formik.handleChange} className='tap-select-add-experience w-100' placeholder='Select an option'>
                                        <option defaultValue value={0}>Select an reason</option>
                                        {(reasons ?? []).map((r:any,index:number)=>
                                            (<option key={`duration-${index}`} value={r.id}>{r.reason}</option>)
                                        )}
                                    </select>
                                </div>
                                <ErrorMessage name="rejection_reason_id" component="div" className="tap-add-experience-text text-danger" />
                            </div>

                            {/* Note */}
                            <div className="decline-experience__field">
                                <label className="decline-experience__label">
                                    Note
                                </label>

                                <div className="tap-add-experience-2-input-line h-auto">
                                    <textarea name="rejection_note" value={formik.values.rejection_note} onChange={formik.handleChange} className="tap-add-experience-2-input textarea-autosize" onInput={handleTextAreaInput} ref={textareaRef} maxLength={100} />
                                </div>

                                <div className="decline-experience__note-footer">
                                    <span>why decline</span>
                                    <span>{formik?.values?.rejection_note?.length}/100</span>
                                </div>
                                <ErrorMessage name="rejection_note" component="div" className="tap-add-experience-text text-danger" />
                            </div>
                        </div>

                        <div className="decline-experience__actions">
                            <button className="decline-experience__btn decline-experience__btn--secondary" onClick={onCancelHandle}>
                                Cancel
                            </button>

                            <button type='submit' className="decline-experience__btn decline-experience__btn--primary">
                                Decline
                                &nbsp;<KTSVG path='/media/svg/nobilis/vector02.svg' />
                            </button>
                        </div>
                    </div>
                </Form>)
            }}
        </Formik>
    </Modal>)
}
