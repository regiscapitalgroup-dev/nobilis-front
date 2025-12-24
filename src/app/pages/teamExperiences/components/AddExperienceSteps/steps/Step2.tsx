import { FC, useEffect, useRef, useState } from 'react'
import { ErrorMessage, FieldArray, useFormikContext } from 'formik'
import { DatePicker } from 'antd'
import { KTSVG } from '../../../../../../_metronic/helpers'
import { Props } from '../../../AddExperiencePage'
import { CategoryAutocompleteField } from '../fields/CategoryAutocompleteField'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../../../setup'
import { IAuthState } from '../../../../../modules/auth'
import { Link, useHistory } from 'react-router-dom'
import { InviteePrivateAutocompleteField } from '../fields/InviteePrivateAutocompleteField'
import { MembersHostPresenceAutocompleteField } from '../fields/MembersHostPresenceAutocompleteField'
import { BeneficiaryAutocompleteField } from '../fields/BeneficiaryAutocompleteField'
import ImageExperienceField from '../fields/ImageExperienceField'
import GalleryUploadField from '../fields/GalleryUploadField'
import CityAutocompleteField from '../fields/CityAutocompleteField'
import { GenericModel } from '../../../models/GenericModel'
import { EXPERIENCE_STATUS } from '../../../models/ExperienceStatus'
import { getHost } from '../../../../../services/teamExperienceService'
import { validateShowButtonActions } from '../utils'

const Step2: FC<Props> = ({ onNextStep, onBackStep, haveErrors, onLoad, onLoadMessage, onPause, catalogs, onSaveDraft }) => {
    const formik = useFormikContext();
    const [isEditing, setIsEditing] = useState(false);
    const userData = useSelector<RootState>(({ auth }) => auth, shallowEqual) as IAuthState
    const history = useHistory()
    const [listHost, setListHost] = useState<any[]>([]);

    const getUserListHosts = async () => {
        if(formik.values.host_type === "member"){
            let hosts = await getHost({ });
            setListHost(hosts?.results)
        }else{
            let hosts = await getHost({ type: 'partner' });
            setListHost(hosts?.results)
        }
    }

    useEffect(() => {
        getUserListHosts();
    }, [formik.values.host_type]);

    const handleExperienceChange = (e: any) => {
        const value = e.target.value.slice(0, 100); // límite
        formik.setFieldValue("title", value);
    };

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    // Cuando el input recibe focus
    const handleFocus = () => {
        setIsEditing(true);

        const formatted = formik.values.price_per_guest_text;
        if (!formatted) return;

        // Quitar formato: $ , . etc.
        const numeric = formatted.replace(/[^0-9]/g, "");
        const cleaned = numeric.slice(0, -2);
        formik.setFieldValue("price_per_guest_text", cleaned);
    };

    // Cuando el usuario escribe
    const handleChange = (e: any) => {
        const raw = e.target.value.replace(/[^0-9]/g, "");
        formik.setFieldValue("price_per_guest_text", raw);
        formik.handleChange(e);
    };

    // Cuando pierde focus
    const handleBlur = () => {
        setIsEditing(false);

        const raw = formik.values.price_per_guest_text;
        if (!raw) return;

        const numberValue = isNaN(Number(raw)) ? 0 : Number(raw);
        const formatted = formatter.format(numberValue);

        formik.setFieldValue("price_per_guest_text", formatted);
        formik.setFieldValue("price_per_guest", numberValue);
    };

    const handleCategoryChange = (value:string) => {
        formik.setFieldValue("category_ids", value);
    };
    
    const handleInviteesChange = (value:string) => {
        formik.setFieldValue("allowed_guest_ids", value);
        formik.validateForm();
    };

    const textareaRef = useRef(null);
    const handleTextAreaInput = (e) => {
        const el = textareaRef.current;
        el.style.height = "auto"; // resetea para medir bien
        const lineHeight = 20;    // ajusta según tu font-size
        const maxHeight = 5 * lineHeight;

        el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";
    };

    const handleInviteGuestsChange = (e:any) => {
        formik.handleChange(e);
        formik.validateForm();
    };

    const handleAdditionalTeamMembersChange = (value:string) => {
        formik.setFieldValue("additional_team_member_ids", value);
        formik.validateForm();
    };

    const handleBeneficiariesChange = (value:string) => {
        formik.setFieldValue("beneficiaries", value);
        formik.validateForm();
    };

    return (
        <div className="tap-add-experience-2-wrapper-container">
            <div className="tap-add-experience-2-wrapper">
                {/* <!-- 1. TITLE --> */}
                <div className="tap-add-experience-2-header">
                    <div className="tap-add-experience-2-title">
                        { formik?.values?.id > 0 ? 'Edit experience' : 'Host Experience' }
                    </div>
                </div>
                {/* <!-- 2. STEP HEADER --> */}
                <div className={`tap-add-experience-2-step-header ${formik?.values?.id > 0 ? 'd-none' : ''}`}>
                    <div className="tap-add-experience-2-step-count">step 2/3</div>
                    <div className="tap-add-experience-2-divider"></div>
                </div>
                <section className={`tap-add-experience-2-section ${formik?.values?.id > 0 ? '' : 'd-none'}`}>
                    <div className="tap-add-experience-2-section-text">
                        NOTE
                    </div>
                    <div className="tap-add-experience-2-input-group">
                        <label className="tap-add-experience-2-label">You can only edit certain info only when editing an active experience</label>
                        <div className="tap-add-experience-2-input-line">
                        </div>
                    </div>
                </section>
                {/* <!-- 5. Host Type --> */}
                <section className="tap-add-experience-2-section">
                    <label className="tap-add-experience-2-section-heading">Type Host</label>
                    <div className="tap-add-experience-2-radio-row">
                        <div className={`tap-add-experience-2-radio-card w-50 ${formik.values.host_type === "partner" ? 'tap-add-experience-2-radio-card--selected' : ''}`}>
                            <label className="tap-host-option p-6 w-100">
                                <input type="radio" className="tap-host-radio-input"
                                    name="host_type"
                                    value="partner"
                                    checked={formik.values.host_type === "partner"}
                                    onChange={formik.handleChange}
                                />
                                <div className="tap-host-radio">
                                    <div className="tap-host-radio-outer"></div>
                                    <div className="tap-host-radio-inner"></div>
                                </div>
                                <div className="tap-host-option-label">Partner</div>
                            </label>
                        </div>
                        <div className={`tap-add-experience-2-radio-card w-50 ${formik.values.host_type === "member" ? 'tap-add-experience-2-radio-card--selected' : ''}`}>
                            <label className="tap-host-option p-6 w-100">
                                <input type="radio" className="tap-host-radio-input"
                                    name="host_type"
                                    value="member"
                                    checked={formik.values.host_type === "member"}
                                    onChange={formik.handleChange}
                                />
                                <div className="tap-host-radio">
                                    <div className="tap-host-radio-outer"></div>
                                    <div className="tap-host-radio-inner"></div>
                                </div>
                                <div className="tap-host-option-label">Member</div>
                            </label>
                        </div>
                    </div>
                    <ErrorMessage name="host_type" component="div" className="tap-add-experience-text text-danger" />
                </section>
                {/* <!-- 5. Host --> */}
                <section className="tap-add-experience-2-section">
                    <label className="tap-add-experience-2-label">Host</label>
                    <div>
                        <div className="tap-add-experience-2-input-line">
                            <select name="host_id" value={formik.values.host_id} onChange={formik.handleChange} className='tap-select-add-experience w-100' placeholder='Select an option'>
                                <option value={0} defaultChecked>Select a host</option>
                                {(listHost ?? []).map((r:any,index:number)=>
                                    (<option key={`duration-${index}`} value={Number(r.id)}>{r.fullName} {r.email}</option>)
                                )}
                            </select>
                        </div>
                        <div className="tap-add-experience-2-input-hint mt-3">
                            Select the host of the experience
                        </div>
                        <ErrorMessage name="host_id" component="div" className="tap-add-experience-text text-danger" />
                    </div>
                </section>
                {/* <!-- 3. NAME THE EXPERIENCE --> */}
                <section className="tap-add-experience-2-section">
                    <div className="tap-add-experience-2-section-text">
                        Share your best—what’s ordinary to you is extraordinary to others.
                    </div>
                    <div className="tap-add-experience-2-input-group">
                        <label className="tap-add-experience-2-label">name the experience</label>
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
                    <label className="tap-add-experience-2-label">Itinerary of Experience</label>
                    <div>
                        <div className="tap-add-experience-2-input-line h-auto">
                            <textarea name="itinerary" value={formik.values.itinerary} onChange={formik.handleChange} className="tap-add-experience-2-input textarea-autosize" onInput={handleTextAreaInput} ref={textareaRef} maxLength={500} />
                        </div>
                        <div className="tap-add-experience-2-input-hint mt-3">
                            Provide a detailed schedule of your experience, outlined by days, hours, or key moments.
                        </div>
                        <ErrorMessage name="itinerary" component="div" className="tap-add-experience-text text-danger" />
                    </div>
                </section>
                {/* <!-- 5. WHAT'S INCLUDED --> */}
                <section className="tap-add-experience-2-section">
                    <label className="tap-add-experience-2-label">What's Included</label>
                    <div>
                        <div className="tap-add-experience-2-input-line">
                            <input name='what_is_included' value={formik.values.what_is_included} onChange={formik.handleChange} className="tap-add-experience-2-input" maxLength={500} />
                        </div>
                        <div className="tap-add-experience-2-input-hint mt-3">
                            List what is included—meals, transport, access, or other key elements.
                        </div>
                        <ErrorMessage name="what_is_included" component="div" className="tap-add-experience-text text-danger" />
                    </div>
                </section>
                {/* <!-- 6. AVAILABILITY --> */}
                <section className="tap-add-experience-2-section">
                    <label className="tap-add-experience-2-section-heading">Availability </label>
                    <div className="tap-add-experience-2-radio-row">
                        <div className={`tap-add-experience-2-radio-card w-50 ${formik.values.availability_type === "by_date" ? 'tap-add-experience-2-radio-card--selected' : ''}`}>
                            <label className="tap-host-option p-6 w-100">
                                <input type="radio" className="tap-host-radio-input"
                                    name="availability_type"
                                    value="by_date"
                                    checked={formik.values.availability_type === "by_date"}
                                    onChange={formik.handleChange}
                                />
                                <div className="tap-host-radio">
                                    <div className="tap-host-radio-outer"></div>
                                    <div className="tap-host-radio-inner"></div>
                                </div>
                                <div className="tap-host-option-label">By Date</div>
                            </label>
                        </div>
                        <div className={`tap-add-experience-2-radio-card w-50 ${formik.values.availability_type === "by_request" ? 'tap-add-experience-2-radio-card--selected' : ''}`}>
                            <label className="tap-host-option p-6 w-100">
                                <input type="radio" className="tap-host-radio-input"
                                    name="availability_type"
                                    value="by_request"
                                    checked={formik.values.availability_type === "by_request"}
                                    onChange={formik.handleChange}
                                />
                                <div className="tap-host-radio">
                                    <div className="tap-host-radio-outer"></div>
                                    <div className="tap-host-radio-inner"></div>
                                </div>
                                <div className="tap-host-option-label">Upon Request</div>
                            </label>
                        </div>
                    </div>
                    <div className={`w-100 flex-column ${formik.values.availability_type === "by_date" ? 'd-flex' : 'd-none'}`}>
                        <FieldArray name="dates_data">
                            {({ push, remove }) => (<>
                                <div role="button" onClick={() => push({ start: null, end: null })} className="tap-add-experience-2-add-text mb-5">
                                    + Add a date
                                </div>
                                <div className='d-flex flex-column w-100'>
                                    {(formik.values.dates_data ?? []).map((item, index) => (
                                        <div key={`dates_data-${index}`} className='d-flex flex-column'>
                                            <div className="w-100 d-flex flex-row gap-4" style={{ marginBottom: "24px" }}>
                                                {/* START DATE */}
                                                <DatePicker
                                                    value={item.start}
                                                    onChange={(value) => formik.setFieldValue(`dates_data[${index}].start`, value)}
                                                    showTime={{ format: "HH:mm" }}
                                                    format="D MMM YYYY HH:mm"
                                                    placeholder="Start date"
                                                    className="form-control" />
                                                {/* END DATE */}
                                                <DatePicker
                                                    value={item.end}
                                                    onChange={(value) => formik.setFieldValue(`dates_data[${index}].end`, value)}
                                                    showTime={{ format: "HH:mm" }}
                                                    format="D MMM YYYY HH:mm"
                                                    placeholder="End date"
                                                    className="form-control" />

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
                                                <ErrorMessage name={`dates_data[${index}].start`} component="div" className="tap-add-experience-text text-danger w-50" />
                                                <ErrorMessage name={`dates_data[${index}].end`} component="div" className="tap-add-experience-text text-danger w-50" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>)}
                        </FieldArray>
                    </div>
                    <ErrorMessage name={`dates_data`} component="div" className="tap-add-experience-text text-danger w-50" />
                    <div className={`w-100 flex-column ${formik.values.availability_type === "by_request" ? 'd-flex' : 'd-none'}`}>
                        <div style={{ width: '100%', color: '#808080', fontSize: 12, fontFamily: 'Satoshi', fontWeight: '300', lineHeight: '16.80px', wordWrap: 'break-word' }}>Explanation of the Upon request feature</div>
                    </div>
                </section>
                {/* <!-- 7. DURATION --> */}
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
                                    {(catalogs?.durations ?? []).map((r:GenericModel,index)=>
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
                {/* <!-- 8. PRICE PER GUEST --> */}
                <section className="tap-add-experience-2-section">
                    <label className="tap-add-experience-2-section-heading">Price Per Guest</label>
                    <div className="tap-add-experience-2-description">
                        Set the net price per guest. A service fee of X% (minimum X USD) will be added.
                    </div>
                    <div className="tap-add-experience-2-price-box">
                        <div className="tap-add-experience-2-price-left w-100">
                            <span>USD </span>
                            <input name="price_per_guest_text" type='text' value={formik.values.price_per_guest_text} onFocus={handleFocus} onChange={handleChange} onBlur={handleBlur}className="tap-add-experience-2-input" max={1000000000} maxLength={10} />
                        </div>
                        <div className="tap-add-experience-2-price-right">/Guest</div>
                    </div>
                    <ErrorMessage name="price_per_guest_text" component="div" className="tap-add-experience-text text-danger" />
                </section>
                {/* <!-- 9. OPTIONAL ENHANCEMENTS --> */}
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
                {/* <!-- 10. CATEGORIES --> */}
                <section className="tap-add-experience-2-section">
                    <label className="tap-add-experience-2-section-heading">Categories</label>
                    <div className="tap-add-experience-2-description">Select up to 3 applicable categories:</div>
                    <div className="tap-add-experience-2-category-row">
                        {/* aqui debe de ser un componente tipo selector creo hay que ver como esta el de editar el profile */}
                        <CategoryAutocompleteField values={formik.values.category_ids} onChange={handleCategoryChange}/>
                    </div>
                    <ErrorMessage name={`category_ids`} component="div" className="tap-add-experience-text text-danger w-50" />
                </section>
                {/* <!-- 11. LOCATION --> */}
                <section className="tap-add-experience-2-section">
                    <label className="tap-add-experience-2-section-heading">Location</label>
                    <div className="tap-add-experience-2-description">
                        Only confirmed guests will see the full address. Until then, only city and country.
                    </div>
                    <div className="tap-add-experience-2-input-group">
                        <label className="tap-add-experience-2-label">Address</label>
                        {/* <div className="tap-add-experience-2-input-line">
                            <input name="location_address" value={formik.values.location_address} onChange={formik.handleChange} className="tap-add-experience-2-input" />
                        </div> */}
                        <CityAutocompleteField name='location_address' />
                        <ErrorMessage name={`location_address`} component="div" className="tap-add-experience-text text-danger" />
                    </div>
                    <div className="tap-add-experience-2-input-group">
                        <label className="tap-add-experience-2-label">Arrival notes</label>
                        <div className="tap-add-experience-2-input-line">
                            <input name="arrival_notes" value={formik.values.arrival_notes} onChange={formik.handleChange} className="tap-add-experience-2-input" />
                        </div>
                        <ErrorMessage name={`arrival_notes`} component="div" className="tap-add-experience-text text-danger" />
                    </div>
                </section>
                {/* <!-- 12. INVITE GUESTS --> */}
                <section className="tap-add-experience-2-section">
                    <label className="tap-add-experience-2-section-heading">Invite Guests</label>
                    <div className="tap-add-experience-2-description">
                        You may share your experience openly with all Members - Public, or keep it Private—inviting only selected Members of the Nobilis community.
                    </div>
                    <div className="tap-add-experience-2-radio-list">
                        <div className={`tap-add-experience-2-radio-card ${formik.values.public ? 'tap-add-experience-2-radio-card--selected' : ''}`}>
                            <label className="tap-host-option p-6 w-100">
                                <input
                                    type="radio"
                                    name="public"
                                    value={true}
                                    className="tap-host-radio-input"
                                    checked={formik.values.public}
                                    onChange={handleInviteGuestsChange}
                                />
                                <div className="tap-host-radio">
                                    <div className="tap-host-radio-outer"></div>
                                    <div className="tap-host-radio-inner"></div>
                                </div>
                                <div className="tap-host-option-label">Public - Visible to all Nobilis Members</div>
                            </label>
                        </div>
                        <div className={`tap-add-experience-2-radio-card ${!formik.values.public ? 'tap-add-experience-2-radio-card--selected' : ''}`}>
                            <label className="tap-host-option p-6 w-100">
                                <input disabled={userData?.subscription?.status != 'active'}
                                    type="radio"
                                    name="public"
                                    value={false}
                                    className={`tap-host-radio-input`}
                                    checked={!formik.values.public}
                                    onChange={handleInviteGuestsChange}
                                />
                                <div className="tap-host-radio">
                                    <div className="tap-host-radio-outer"></div>
                                    <div className="tap-host-radio-inner"></div>
                                </div>
                                <div className={`tap-host-option-label ${userData?.subscription?.status != 'active' ? 'w-50' : 'w-100'}`}>
                                    Private — Accessible Only to Those You Invite
                                </div>
                                {userData?.subscription?.status != 'active' ? (
                                    <Link to="/plans" className="tap-add-experience-2-upgrade-container w-50">
                                        <div className="tap-add-experience-2-upgrade-text-group">
                                            <div className="tap-add-experience-2-upgrade-title">
                                            Upgrade to host private encounter
                                            </div>
                                            <div className="tap-add-experience-2-upgrade-subtitle">
                                            Electi ∞ Membership Required
                                            </div>
                                        </div>
                                        &nbsp;<KTSVG path='/media/svg/nobilis/teams_and_partner/waitlist_nb_btn_icon_host_experience_btn.svg' />
                                    </Link>

                                ) : null}
                            </label>
                        </div>
                    </div>
                    <div className={`w-100 flex-column ${!formik.values.public ? 'd-flex' : 'd-none'}`}>
                        <InviteePrivateAutocompleteField values={formik.values.allowed_guest_ids} onChange={handleInviteesChange}/>
                    </div>
                    <ErrorMessage name={`allowed_guest_ids`} component="div" className={`tap-add-experience-text text-danger ${!formik.values.public ? 'd-flex' : 'd-flex'}`} />
                </section>
                {/* <!-- 13. AUDIENCE --> */}
                <section className="tap-add-experience-2-section">
                    <label className="tap-add-experience-2-section-heading">Audience</label>
                    <div className="tap-add-experience-2-radio-row">
                        {(catalogs?.audiences ?? []).map((audience:GenericModel,index)=>{
                            return (<div key={`radio-audience-${index}`} className={`tap-add-experience-2-radio-card w-50 ${formik.values.audience_type == audience.id ? 'tap-add-experience-2-radio-card--selected' : ''}`}>
                                <label className="tap-host-option p-6 w-100">
                                    <input
                                        type="radio"
                                        name="audience_type"
                                        value={audience.id}
                                        className="tap-host-radio-input"
                                        checked={formik.values.audience_type == audience.id}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}/>
                                    <div className="tap-host-radio">
                                        <div className="tap-host-radio-outer"></div>
                                        <div className="tap-host-radio-inner"></div>
                                    </div>
                                    <div className="tap-host-option-label">{audience.name}</div>
                                </label>
                            </div>)
                        })}
                    </div>
                    <div className="tap-add-experience-2-description">
                        Infants under 2 complimentary; children 2-12 25% reduction; 13+ standard rate.
                    </div>
                </section>
                {/* <!-- 14. GUEST CAPACITY --> */}
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
                {/* <!-- 15. IMPORTANT INFORMATION --> */}
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
                {/* <!-- 16. IDEAL AUDIENCE --> */}
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
                {/* <!-- 17. HOST PRESENCE --> */}
                <section className="tap-add-experience-2-section">
                    <label className="tap-add-experience-2-section-heading">Host Presence & Team Management</label>
                    <div className="tap-add-experience-2-label">
                        Specify your personal participation—experiences require significant host presence to be accepted.
                    </div>
                    <div>
                        <div className="tap-add-experience-2-input-line">
                            <input name="host_presence" value={formik.values.host_presence} onChange={formik.handleChange} className="tap-add-experience-2-input" maxLength={100} />
                        </div>
                        <div className="tap-add-experience-2-input-hint mt-3">
                            E.g. Full duration, Opening Dinner (min. 3 hours), or Final Day
                        </div>
                        <ErrorMessage name={`host_presence`} component="div" className="tap-add-experience-text text-danger" />
                    </div>
                    <div className="tap-add-experience-2-label">
                        Assign additional team members or representatives to support your experience (optional).
                    </div>
                    <div>
                        <div className={`w-100 flex-column`}>
                            <MembersHostPresenceAutocompleteField values={formik.values.additional_team_member_ids} onChange={handleAdditionalTeamMembersChange}/>
                        </div>
                        <ErrorMessage name={`additional_team_member_ids`} component="div" className={`tap-add-experience-text text-danger`} />
                    </div>
                </section>
                {/* <!-- 18. BENEFICIARY --> */}
                <section className="tap-add-experience-2-section">
                    <label className="tap-add-experience-2-section-heading">Beneficiary</label>
                    <div className='tap-add-experience-2-section-beneficiary-description'>Select the type of beneficiary for this experience. Non-Profit beneficiaries will be displayed publicly as Impact/Philanthropy; For-Profit beneficiaries remain private.</div>
                    <div className="tap-add-experience-2-radio-row">
                        <div className={`tap-add-experience-2-radio-card w-50 ${formik.values.beneficiary_for_profit ? 'tap-add-experience-2-radio-card--selected' : ''}`}>
                            <label className="tap-host-option p-6 w-100">
                                <input
                                    type="radio"
                                    name="beneficiary_for_profit"
                                    className="tap-host-radio-input"
                                    checked={formik.values.beneficiary_for_profit === true}
                                    onChange={() => formik.setFieldValue("beneficiary_for_profit", true)}
                                    onBlur={formik.handleBlur}
                                />
                                <div className="tap-host-radio">
                                    <div className="tap-host-radio-outer"></div>
                                    <div className="tap-host-radio-inner"></div>
                                </div>
                                <div className="tap-host-option-label">For-Profit</div>
                            </label>
                        </div>
                        <div className={`tap-add-experience-2-radio-card w-50 ${!formik.values.beneficiary_for_profit ? 'tap-add-experience-2-radio-card--selected' : ''}`}>
                            <label className="tap-host-option p-6 w-100">
                                <input
                                    type="radio"
                                    name="beneficiary_for_profit"
                                    className="tap-host-radio-input"
                                    checked={formik.values.beneficiary_for_profit === false}
                                    onChange={() => formik.setFieldValue("beneficiary_for_profit", false)}
                                    onBlur={formik.handleBlur}
                                />
                                <div className="tap-host-radio">
                                    <div className="tap-host-radio-outer"></div>
                                    <div className="tap-host-radio-inner"></div>
                                </div>
                                <div className="tap-host-option-label">Non-Profit (Impact/Philanthropy)</div>
                            </label>
                        </div>
                    </div>
                    <div className={`tap-add-experience-2-checkbox-row ${!formik.values.beneficiary_for_profit ? 'd-flex' : 'd-none'}`}>
                        <div className="tap-add-experience-2-checkbox">
                            <input id="beneficiary_check" className="tap-add-experience-2-checkbox-box" name='beneficiary_check' value={formik.values.beneficiary_check} onChange={formik.handleChange} onBlur={formik.handleBlur} type="checkbox" />
                        </div>
                        <label htmlFor="beneficiary_check" className="tap-add-experience-2-checkbox-text">
                            I acknowledge that if this experience is marked as Non-Profit, the selected account name
                            will be publicly displayed as the beneficiary.
                        </label>
                    </div>
                    <ErrorMessage name={`beneficiary_check`} component="div" className={`tap-add-experience-text text-danger`} />
                    <div className="tap-add-experience-2-label">
                        Select beneficiary
                    </div>
                    <div className={`w-100 flex-column`}>
                        <BeneficiaryAutocompleteField values={formik.values.beneficiaries} onChange={handleBeneficiariesChange}/>
                    </div>
                    <ErrorMessage name={`beneficiaries`} component="div" className={`tap-add-experience-text text-danger`} />
                </section>
                {/* <!-- 19. VISUALS --> */}
                <section className="tap-add-experience-2-section">
                    <label className="tap-add-experience-2-section-heading">Visuals</label>
                    <div className="tap-add-experience-2-description">
                        Select images that reflect the tone, setting, and uniqueness of your experience. The first image will serve as the cover.
                    </div>
                    <div className="tap-add-experience-2-upload-box">
                        <label>Cover Images</label>
                    </div>
                    <div className="tap-add-experience-2-upload-box">
                        <ImageExperienceField />
                        <ErrorMessage name={`imageCover`} component="div" className={`tap-add-experience-text text-danger`} />
                    </div>
                    <div className="tap-add-experience-2-upload-box">
                        <label>Gallery Images</label>
                    </div>
                    <div className="tap-add-experience-2-upload-box">
                        <GalleryUploadField />
                        <ErrorMessage name={`galleryImages`} component="div" className={`tap-add-experience-text text-danger`} />
                    </div>
                </section>
                {/* <!-- 20. VIDEO LINK --> */}
                <section className="tap-add-experience-2-section">
                    <label className="tap-add-experience-2-section-heading">Add Video Link <span className='tap-add-experience-guest-option'>(OPCIONAL)</span></label>
                    <div className="tap-add-experience-2-input-line">
                        <input name="optional_video_link" value={formik.values.optional_video_link} onChange={formik.handleChange} className="tap-add-experience-2-input" />
                    </div>
                    <ErrorMessage name={`optional_video_link`} component="div" className={`tap-add-experience-text text-danger`} />
                </section>
                {/* <!-- 21. FOOTER --> */}
                <div className="tap-add-experience-2-footer">
                    <div role='button' onClick={()=>history.goBack()} className={`tap-add-experience-2-btn-secondary ${formik.values?.id > 0 ? '' : 'd-none'}`}>
                        go back
                    </div>
                    <div role='button' onClick={onBackStep} className={`tap-add-experience-2-btn-secondary ${formik.values?.id > 0 ? 'd-none' : ''}`}>
                        back
                    </div>
                    <div className="tap-add-experience-2-footer-right">
                        <button type="button" className={`tap-add-experience-2-btn-secondary ${validateShowButtonActions('paused',formik)}`} onClick={()=>onPause(true)}>
                            <div>Pause Experience</div>
                        </button>
                        <button type="button" className={`tap-add-experience-2-btn-secondary ${validateShowButtonActions('draft',formik)}`} onClick={onSaveDraft}>
                            <div>save for later</div>
                        </button>
                        <div role='button' onClick={onNextStep} className="tap-add-experience-2-btn-main tap-flex-center">
                            <div className='tap-host-button-text tap-flex-center'>
                                next
                                &nbsp;<KTSVG path='/media/svg/nobilis/teams_and_partner/waitlist_nb_btn_icon_host_experience_btn.svg' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Step2 }
