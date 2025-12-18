import { Formik, Form, ErrorMessage, FieldArray } from "formik";
import { FC, useEffect, useRef, useState } from "react";
import { useLayout } from "../../../_metronic/layout/core";
import * as Yup from 'yup'
import { rangeSchema } from "../../helpers/FormatInputs";
import { RequiredInfoModal } from "./components/RequiredInfoModal";
import { PauseExperienceModal } from "./components/PauseExperienceModal";
import { Link, useHistory, useParams } from "react-router-dom";
import { getAudiences, getDetailExperience, getDurations, updateExperience } from "../../services/teamExperienceService";
import { KTSVG } from "../../../_metronic/helpers";
import { ExperienceDetail } from "./models/ExperienceSummaryModel";
import { GenericModel } from "./models/GenericModel";
import { showErrorAlert } from "../../helpers/alert";
import { LoaderOverlay } from "../../hooks/loader/LoaderOverlay";
import { EXPERIENCE_STATUS } from "./models/ExperienceStatus";

const UpdateExperiencePage: FC = () => {
    const formikRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [showModalPause, setShowModalPause] = useState(false);
    const [messageModal, setMessageModal] = useState("");
    const history = useHistory()
    const [durations, setDuration] = useState<GenericModel>([]);
    const [audiences, setAudiences] = useState<GenericModel>([]);
    const [isLoader, setIsLoader] = useState(false);

    const { config, setLayout } = useLayout()
    const restoreRef = useRef(config)
    const { id } = useParams();

    const initializeValues = async (data:ExperienceDetail) => {
        try {
            await formikRef.current.setFieldValue("id", data.id);
            await formikRef.current.setFieldValue("title", data.title);
            await formikRef.current.setFieldValue("itinerary", data.itinerary);
            await formikRef.current.setFieldValue("what_is_included", data.whatIsIncluded);
            const cleanedEnhancements = data.enhancements.map(({ id, ...rest }) => rest);
            await formikRef.current.setFieldValue("enhancements_data", cleanedEnhancements);
            await formikRef.current.setFieldValue("ideal_audience", data.idealAudience);
            await formikRef.current.setFieldValue("duration_type", data.durationType);
            await formikRef.current.setFieldValue("duration", data.duration);
            await formikRef.current.setFieldValue("audience_type", data.audienceType);
            await formikRef.current.setFieldValue("guest_capacity_adults", data.guestCapacityAdults);
            await formikRef.current.setFieldValue("guest_capacity_children", data.guestCapacityChildren);
            await formikRef.current.setFieldValue("guest_capacity_infants", data.guestCapacityInfants);
            await formikRef.current.setFieldValue("important_information_guest", data.importantInformationGuest);
            await formikRef.current.setFieldValue("public", data.public);
            await formikRef.current.setFieldValue("confidentiality_type", data.confidentialityType ?? 1);
            await formikRef.current.setFieldValue("confidentiality_check", data.confidentialityCheck);
            await formikRef.current.setFieldValue("policy_cancelation_check", data.policyCancelationCheck);
            await formikRef.current.setFieldValue("status", data.status);
            await formikRef.current.setFieldValue("optional_video_link", data.optionalVideoLink);
        } catch (error) {
        }
    }

    useEffect(() => {
        restoreRef.current = config
        setLayout({
            ...config,
            header: { ...config.header, display: true },
            aside: { ...config.aside, display: true },
            toolbar: { ...config.toolbar, display: false },
            footer: { ...config.footer, display: true },
        })

        const fetchData = async () => {
            setIsLoader(true);
            const audience = await getAudiences();
            setAudiences(audience.results)
            const duration = await getDurations();
            setDuration(duration.results)
            const experience_ = await getDetailExperience(id);
            /* seteamos los datos */
            initializeValues(experience_);
            setIsLoader(false);
        }
        fetchData();

        return () => setLayout(restoreRef.current)
    }, [])

    const initialValues = {
        /* step1  */
        id: 0,
        /* step2  */
        title: "",
        itinerary: "",
        what_is_included: "",
        enhancements_data: [],
        ideal_audience: "",
        duration_type: 2,
        duration: "",
        audience_type: 1,
        guest_capacity_adults: "",
        guest_capacity_children: "",
        guest_capacity_infants: "",
        important_information_guest: "",
        public: true,
        optional_video_link: '',
        /* step3  */
        confidentiality_type: 1,
        confidentiality_check: false,
        policy_cancelation_check: false,
        status: 0,
    };

    const validationSchema = Yup.object({
        /* step1  */
        id: Yup.number(),
        /* step2  */
        title: Yup.string().required("Experience name is required").max(100, "Max 100 characters"),
        itinerary: Yup.string().required("Itinerary is required").max(1000, "Max 1000 characters"),
        what_is_included: Yup.string().required("Includes field is required").max(1000, "Max 1000 characters"),
        duration_type: Yup.number().required("Enter a number"),
        duration: Yup.number().required("Enter a number").max(31,"Max 31"),
        enhancements_data: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required("Service name is required").max(100, "Max 100 characters"),
                price: Yup.number().required("Service price is required").min(0,'Min value is 0').max(1000000000,"Max values $1,000,000,000.00")
            })
        ).min(1, "At least one enhancement is required"),
        audience_type: Yup.number().required('Select an audience type'),
        guest_capacity_adults: rangeSchema(true),
        guest_capacity_children: Yup.string().when('audience_type', {
            is: 1,
            then: rangeSchema(true),     // requerido + formato "min-max"
            otherwise: rangeSchema(false), // no requerido cuando audience_type = 'adults'
        }),
        guest_capacity_infants: Yup.string().when('audience_type', {
            is: 1,
            then: rangeSchema(true),
            otherwise: rangeSchema(false),
        }),
        important_information_guest: Yup.string().max(250, "Max 250 characters"),
        ideal_audience: Yup.string().max(250, "Max 250 characters"),
        public: Yup.boolean(),
        /* step3  */
        confidentiality_type: Yup.number(),
        confidentiality_check: Yup.boolean().oneOf([true], "Policy confirmation is required").required("Policy confirmation is required"),
        policy_cancelation_check: Yup.boolean().oneOf([true], "Cancellation policy confirmation is required").required("Cancellation policy confirmation is required"),
    });

    const handleSubmit = async (values) => {
        try {
            let cloneObj = JSON.parse(JSON.stringify({...values}));
            cloneObj.audience_type = Number(cloneObj.audience_type);
            cloneObj.duration_type = Number(cloneObj.duration_type);
            let response = await updateExperience(values.id,cloneObj);
            if(response?.id){
                if(values.status == EXPERIENCE_STATUS.DRAFT){ // draft
                    history.replace('/my-experience/draft')
                }else if(values.status == EXPERIENCE_STATUS.PENDING || values.status == EXPERIENCE_STATUS.PUBLISHED){
                    history.replace('/my-experience/success')
                }else if(values.status == EXPERIENCE_STATUS.PAUSED){
                    history.replace('/my-experience/paused')
                }
            }else{
                showErrorAlert({ title: 'Error Saving Changes', message: 'There was a problem saving your data. Please try again.' })
            }
        } catch (error) {
            showErrorAlert({ title: 'Error Saving Changes', message: 'There was a problem saving your data. Please try again.' })
        }
    };

    const handlePause = async () => {
        await formikRef.current.setFieldValue("status",EXPERIENCE_STATUS.PENDING);
        setShowModalPause(false);
        let haveErrs:boolean = await haveErrors();
        if(!haveErrs){
            await formikRef.current.submitForm();
        }
    }

    const handleValidateForm = async () => {
        await formikRef.current.setFieldValue("status",EXPERIENCE_STATUS.PENDING);
        let haveErrs:boolean = await haveErrors();
        if(!haveErrs){
            await formikRef.current.submitForm();
        }
    }

    const handleExperienceChange = (e: any) => {
        const value = e.target.value.slice(0, 100); // límite
        formikRef.current.setFieldValue("title", value);
    };

    const textareaRef = useRef(null);
    const handleTextAreaInput = (e) => {
        const el = textareaRef.current;
        el.style.height = "auto"; // resetea para medir bien
        const lineHeight = 20;    // ajusta según tu font-size
        const maxHeight = 5 * lineHeight;

        el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";
    };

    const haveErrors = async () => {
        const errors = await formikRef.current.validateForm();
        const stepErrors = Object.keys(errors);
        if(stepErrors.length>0){
            setMessageModal(`Please enter '${String(stepErrors[0]).replaceAll('_',' ')}' to save your progress.`);
            let input = document.querySelector(`input[name='${stepErrors[0]}']`);
            if(!input){
                input = document.querySelector(`textarea[name='${stepErrors[0]}']`);
            }
            if(!input){
                input = document.querySelector(`select[name='${stepErrors[0]}']`);
            }
            input?.focus();
            setShowModal(true);
            setTouchedForStep();
            return true;
        }
        return false;
    }

    const setTouchedForStep = async () => {
        const errors = await formikRef.current.validateForm();
        // const stepErrors = Object.keys(errors);
        const fieldsToValidate = Object.keys(errors);
        let newTouched: any = {};
        for (const field of fieldsToValidate) {
            const value = formikRef.current.values[field];
            // caso 1: campo normal
            if (!Array.isArray(value)) {
                newTouched[field] = true;
                continue;
            }
            // caso 2: array de objetos (ej: dates)
            if (Array.isArray(value)) {
                newTouched[field] = value.map((item) => {
                    if (typeof item === "object" && item !== null) {
                        return Object.fromEntries(
                            Object.keys(item).map((key) => [key, true])
                        );
                    }
                    return true; // array de valores simples
                });
            }
        }
        formikRef.current.setTouched({
            ...formikRef.current.touched,
            ...newTouched,
        });
    };

    const backStep = () => {
        history.goBack();
    };

    return (<>
        <Formik innerRef={formikRef} initialValues={initialValues} validationSchema={validationSchema} enableReinitialize={true} validateOnMount={true} onSubmit={handleSubmit}>
            {(formik) => {
                return(<Form>
                    <div className="tap-add-experience-2-wrapper-container">
                        <div className="tap-add-experience-2-wrapper">
                            {/* <!-- 1. TITLE --> */}
                            <div className="tap-add-experience-2-header">
                                <div className="tap-add-experience-2-title">Edit Experience</div>
                            </div>
                            {/* <!-- 2. Note --> */}
                            <section className="tap-add-experience-2-section">
                                <div className="tap-add-experience-2-section-text">
                                    NOTE
                                </div>
                                <div className="tap-add-experience-2-input-group">
                                    <label className="tap-add-experience-2-label">You can only edit certain info only when editing an active experience</label>
                                    <div className="tap-add-experience-2-input-line">
                                    </div>
                                </div>
                            </section>
                            {/* <!-- 3. NAME THE EXPERIENCE --> */}
                            <section className="tap-add-experience-2-section">
                                <div className="tap-add-experience-2-section-text">
                                    Name Your Experience
                                </div>
                                <div className="tap-add-experience-2-input-group">
                                    <label className="tap-add-experience-2-label">Experience Name</label>
                                    <div className="tap-add-experience-2-input-line">
                                        <input className="tap-add-experience-2-input"
                                            name="title"
                                            value={formik.values.title}
                                            onChange={handleExperienceChange}
                                            maxLength={100} />
                                    </div>
                                    <div className="tap-add-experience-2-input-footer">
                                        <span className="tap-add-experience-2-input-hint">
                                            Give your experience a compelling title
                                        </span>
                                        <span className="tap-add-experience-2-input-counter">{formik?.values?.title?.length}/100</span>
                                    </div>
                                    <ErrorMessage name="title" component="div" className="tap-add-experience-text text-danger" />
                                </div>
                            </section>
                            {/* <!-- 4. ITINERARY --> */}
                            <section className="tap-add-experience-2-section">
                                <label className="tap-add-experience-2-label">Detailed Itinerary of Experience</label>
                                <div>
                                    <div className="tap-add-experience-2-input-line h-auto">
                                        <textarea name="itinerary" value={formik.values.itinerary} onChange={formik.handleChange} className="tap-add-experience-2-input textarea-autosize" onInput={handleTextAreaInput} ref={textareaRef} maxLength={1000} />
                                    </div>
                                    <div className="tap-add-experience-2-input-hint mt-3">
                                        Provide a detailed itinerary and list all services, locations, or elements that are included.
                                    </div>
                                    <ErrorMessage name="itinerary" component="div" className="tap-add-experience-text text-danger" />
                                </div>
                            </section>
                            {/* <!-- 5. WHAT'S INCLUDED --> */}
                            <section className="tap-add-experience-2-section">
                                <label className="tap-add-experience-2-label">What's Included</label>
                                <div>
                                    <div className="tap-add-experience-2-input-line">
                                        <input name='what_is_included' value={formik.values.what_is_included} onChange={formik.handleChange} className="tap-add-experience-2-input" maxLength={1000} />
                                    </div>
                                    <div className="tap-add-experience-2-input-hint mt-3">
                                        Provide a detailed itinerary and list all services, locations, or elements that are included.
                                    </div>
                                    <ErrorMessage name="what_is_included" component="div" className="tap-add-experience-text text-danger" />
                                </div>
                            </section>
                            {/* <!-- 6. OPTIONAL ENHANCEMENTS --> */}
                            <section className="tap-add-experience-2-section">
                                <label className="tap-add-experience-2-section-heading">Optional Enhancements</label>
                                <div className="tap-add-experience-2-description">
                                    List what is not included by default but can be arranged on request.
                                </div>
                                <div className="tap-add-experience-2-enhancement-row">
                                    <div className={`w-100 flex-column`}>
                                        <FieldArray name="enhancements_data">
                                            {({ push, remove }) => (<>
                                                <div className='d-flex flex-column w-100'>
                                                    {formik.values.enhancements_data.map((item, index) => (
                                                        <div key={`enhancements_data-${index}`} className='d-flex flex-column'>
                                                            <div className="w-100 d-flex flex-row gap-4" style={{ marginBottom: "24px" }}>
                                                                {/* START FIELDS */}
                                                                <div className="tap-add-experience-2-enhancement-input">
                                                                    <label className="tap-add-experience-2-label">Service Name</label>
                                                                    <div className="tap-add-experience-2-input-line">
                                                                        <input value={item.name} onChange={(value) => formik.setFieldValue(`enhancements_data[${index}].name`, value.target.value)} className="tap-add-experience-2-input" />
                                                                    </div>
                                                                </div>
                                                                <div className="tap-add-experience-2-enhancement-input">
                                                                    <label className="tap-add-experience-2-label">Price (USD)</label>
                                                                    <div className="tap-add-experience-2-input-line">
                                                                        <input type='number' value={item.price} onChange={(value) => formik.setFieldValue(`enhancements_data[${index}].price`, value.target.value)} className="tap-add-experience-2-input" />
                                                                    </div>
                                                                </div>
                                                                {/* REMOVE BUTTON */}
                                                                {index >= 0 && (<>
                                                                    {/* <button type="button" onClick={() => {}} className="remove-btn tap-flex-center">
                                                                        <KTSVG path='/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_add_experience_availability_date_edit.svg' />&nbsp;
                                                                    </button> */}
                                                                    <button type="button" onClick={() => remove(index)} className="remove-btn tap-flex-center">
                                                                        <KTSVG path='/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_add_experience_availability_date_delete.svg' />&nbsp;
                                                                    </button>
                                                                </>)}
                                                            </div>
                                                            <div className='w-100 d-flex flex-row'>
                                                                <ErrorMessage name={`enhancements_data[${index}].name`} component="div" className="tap-add-experience-text text-danger w-50" />
                                                                <ErrorMessage name={`enhancements_data[${index}].price`} component="div" className="tap-add-experience-text text-danger w-50" />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div role="button" onClick={() => push({ name: '', price: '' })} className="tap-add-experience-2-add-text mb-5">
                                                    + Add more
                                                </div>
                                            </>)}
                                        </FieldArray>
                                    </div>
                                </div>
                            </section>
                            {/* <!-- 7. IDEAL AUDIENCE --> */}
                            <section className="tap-add-experience-2-section">
                                <label className="tap-add-experience-2-section-heading">Ideal Audience <span className='tap-add-experience-guest-option'>(OPCIONAL)</span></label>
                                <div className="tap-add-experience-2-input-group">
                                    <label className="tap-add-experience-2-label">Who is this experience designed for?</label>
                                    <div className="tap-add-experience-2-input-line">
                                        <input name="ideal_audience" value={formik.values.ideal_audience} onChange={formik.handleChange} className="tap-add-experience-2-input" maxLength={250} />
                                    </div>
                                    <div className="tap-add-experience-2-input-hint">E.g., Adventurers, collectors, philanthropists, families</div>
                                </div>
                            </section>
                            {/* <!-- 8. DURATION --> */}
                            <section className="tap-add-experience-2-section">
                                <label className="tap-add-experience-2-section-heading">Duration</label>
                                <div className="tap-add-experience-2-duration-box">
                                    <div className="tap-add-experience-2-duration-header">
                                        <div className="tap-add-experience-2-duration-left w-100">
                                            <span>#</span>
                                            <input name="duration" type='number' value={formik.values.duration} onChange={formik.handleChange} className="tap-add-experience-2-input" />
                                        </div>
                                        <div className="tap-add-experience-2-duration-right">
                                            {/* <span>Day</span>
                                            <div className="tap-add-experience-2-arrow"></div> */}
                                            <select name="duration_type" value={formik.values.duration_type} onChange={formik.handleChange} className='tap-select-add-experience' placeholder='Select an option'>
                                                {(durations ?? []).map((r:GenericModel,index:number)=>
                                                    (<option key={`duration-${index}`} value={r.id}>{r.name}</option>)
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <ErrorMessage name="duration" component="div" className="tap-add-experience-text text-danger" />
                                    <ErrorMessage name="duration_type" component="div" className="tap-add-experience-text text-danger" />
                                    <div className="tap-add-experience-2-input-hint">
                                        Specify how long the experience lasts
                                    </div>
                                </div>
                            </section>
                            {/* <!-- 9. GUEST CAPACITY --> */}
                            <section className="tap-add-experience-2-section">
                                <label className="tap-add-experience-2-section-heading">Guest Capacity</label>
                                <div className="tap-add-experience-2-capacity-row">
                                    <div className={`tap-add-experience-2-capacity-col ${formik.values.audience_type == 1 || formik.values.audience_type == 2 ? 'd-flex' : 'd-none' }`}>
                                        <label className="tap-add-experience-2-label">Adults</label>
                                        <div className="tap-add-experience-2-input-line">
                                            <input type='text' name="guest_capacity_adults" value={formik.values.guest_capacity_adults} onChange={formik.handleChange} className="tap-add-experience-2-input" placeholder='Minimun - Maximun' />
                                        </div>
                                        <div className="tap-add-experience-2-input-hint">Ages 13 or above</div>
                                        <ErrorMessage name={`guest_capacity_adults`} component="div" className="tap-add-experience-text text-danger" />
                                    </div>
                                    <div className={`tap-add-experience-2-capacity-col ${formik.values.audience_type == 1 ? 'd-flex' : 'd-none' }`}>
                                        <label className="tap-add-experience-2-label">Children</label>
                                        <div className="tap-add-experience-2-input-line">
                                            <input type='text' name="guest_capacity_children" value={formik.values.guest_capacity_children} onChange={formik.handleChange} className="tap-add-experience-2-input" placeholder='Minimun - Maximun' />
                                        </div>
                                        <div className="tap-add-experience-2-input-hint">Ages 2-12</div>
                                        <ErrorMessage name={`guest_capacity_children`} component="div" className="tap-add-experience-text text-danger" />
                                    </div>
                                    <div className={`tap-add-experience-2-capacity-col ${formik.values.audience_type == 1 ? 'd-flex' : 'd-none' }`}>
                                        <label className="tap-add-experience-2-label">Infants</label>
                                        <div className="tap-add-experience-2-input-line">
                                            <input type='text' name="guest_capacity_infants" value={formik.values.guest_capacity_infants} onChange={formik.handleChange} className="tap-add-experience-2-input" placeholder='Minimun - Maximun' />
                                        </div>
                                        <div className="tap-add-experience-2-input-hint">Under 2</div>
                                        <ErrorMessage name={`guest_capacity_infants`} component="div" className="tap-add-experience-text text-danger" />
                                    </div>
                                </div>
                            </section>
                            {/* <!-- 10. IMPORTANT INFORMATION --> */}
                            <section className="tap-add-experience-2-section">
                                <label className="tap-add-experience-2-section-heading">Important Information for Guests <span className='tap-add-experience-guest-option'>(OPCIONAL)</span></label>
                                <div className="tap-add-experience-2-description">
                                    Share important details or instructions guests should know.
                                </div>
                                <div>
                                    <div className="tap-add-experience-2-input-line">
                                        <input name="important_information_guest" value={formik.values.important_information_guest} onChange={formik.handleChange} className="tap-add-experience-2-input" maxLength={250} />
                                    </div>
                                    <div className="tap-add-experience-2-input-hint mt-3">E.g., Clothing, gear, fitness level, cultural context, or anything guests should know</div>
                                    <ErrorMessage name={`important_information_guest`} component="div" className="tap-add-experience-text text-danger" />
                                </div>
                            </section>
                            {/* <!-- 11. CONFIDENTIALITY --> */}
                            <div className="tap-add-experience-3-section">
                                <div className="tap-add-experience-3-section-group">
                                    <div className="tap-add-experience-3-section-label">
                                        Confidentiality & Media Use
                                    </div>
                                    <div className="tap-add-experience-3-section-description">
                                        Nobilis experiences are strictly confidential by default — no photos or videos are permitted unless you and all participants explicitly agree. As the host, you set the tone. If any media use is permitted, please indicate:
                                    </div>
                                </div>
                                {/* RADIO OPTIONS */}
                                <div className="tap-add-experience-2-radio-row flex-column">
                                    <div className={`tap-add-experience-2-radio-card w-100`}>
                                        <label className="tap-host-option p-6 w-100 flex-row">
                                            <div className="tap-add-experience-3-radio-content">
                                                <div className="subtitle">
                                                    { formik.values.public ? 'Public use' : 'Private use'}
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <div className="tap-add-experience-3-section-group">
                                    <div className="tap-add-experience-3-section-label">
                                        Cancellation Policy
                                    </div>
                                    <div className="tap-add-experience-3-section-description">
                                        Cancellation affects attendees and the community trust — please plan carefully.
                                    </div>
                                </div>
                                {/* RADIO OPTIONS */}
                                <div className="tap-add-experience-2-radio-row flex-column cursor-default">
                                    <div className={`tap-add-experience-2-radio-card w-100 cursor-default`}>
                                        <label className="tap-host-option p-6 w-100 flex-row cursor-default">
                                            <div className="tap-add-experience-3-radio-content cursor-default">
                                                <div className="subtitle">
                                                    Nobilis's Cancellation Policy, which may include financial penalties (50-100% of the fee depending on timing), obligations to refund attendees, potential reputational impact, and limited exceptions for verified emergencies.
                                                </div>
                                                <div className="subtitle mt-4">
                                                    I want to <Link to="">cancel</Link> the experience.
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <section className="tap-add-experience-2-section">
                                <label className="tap-add-experience-2-section-heading">Add Video Link <span className='tap-add-experience-guest-option'>(OPCIONAL)</span></label>
                                <div className="tap-add-experience-2-input-line">
                                    <input name="optional_video_link" value={formik.values.optional_video_link} onChange={formik.handleChange} className="tap-add-experience-2-input" />
                                </div>
                                <ErrorMessage name={`optional_video_link`} component="div" className={`tap-add-experience-text text-danger`} />
                            </section>
                            {/* <!-- 21. FOOTER --> */}
                            <div className="tap-add-experience-2-footer">
                                <div role='button' onClick={backStep} className="tap-add-experience-2-btn-secondary">
                                    back
                                </div>
                                <div className="tap-add-experience-2-footer-right">
                                    <button type="button" className="tap-add-experience-2-btn-secondary" onClick={()=>setShowModalPause(true)}>
                                        <div>Pause Experience</div>
                                    </button>
                                    <button type='button' className="tap-add-experience-2-btn-main tap-flex-center" onClick={handleValidateForm}>
                                        <div>Save Changes</div>
                                        &nbsp;<KTSVG path='/media/svg/nobilis/teams_and_partner/waitlist_nb_btn_icon_host_experience_btn.svg' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>)
            }}
        </Formik>
        <RequiredInfoModal open={showModal} message={messageModal} onClose={() => setShowModal(false)} />
        <PauseExperienceModal open={showModalPause} onClose={setShowModalPause} onPause={handlePause} />
        <LoaderOverlay visible={isLoader} message={'Loading...'} />
        </>
    );
}

export { UpdateExperiencePage }