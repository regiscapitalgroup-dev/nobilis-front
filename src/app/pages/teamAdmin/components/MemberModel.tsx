import { FC, useEffect, useState } from 'react'
import { Modal, Dropdown } from 'react-bootstrap-v5'
import { ErrorMessage, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { showErrorAlert } from '../../../helpers/alert'
import { handleApiError } from '../../../utils/handleApiError'
import ImageField from './fields/ImageField'
import { KTSVG } from '../../../../_metronic/helpers'
import { getExperiences } from '../../../services/teamExperienceService'
import { EXPERIENCE_STATUS } from '../../teamExperiences/models/ExperienceStatus'
import { ExperienceSummary } from '../../teamExperiences/models/ExperienceSummaryModel'

type Props = {
    show: boolean;
    onClose: () => void;
    onLoad?: (isloaded:boolean) => void;
}

export const MemberModal: FC<Props> = ({ show, onClose }) => {
    const [experiences, setExperiences] = useState<ExperienceSummary[]>([])
    const [reasons, setReasons] = useState<any[]>([])
    const history = useHistory()

    const fetchData = async () => {
        const experiences = await getExperiences({ limit: 50, offset: 0, status: EXPERIENCE_STATUS.PUBLISHED });
        console.log(experiences.results);
        setExperiences(experiences.results);
    }

    useEffect(()=>{
        fetchData();
    },[])

    const initialValues = {
        id: 0,
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        photo: null,
        role_code: "PROFILE_MANAGEMENT",
        organization: "",
        relation: "",
        experience_ids: [] as number[],
    };

    const validationSchema = Yup.object({
        rejection_reason_id: Yup.number().required("Selected an option").min(1,'Selected an option'),
        email: Yup.string().email('Wrong email format').min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required('Email is required'),
        first_name: Yup.string().required("Name is required").max(100, "Max 100 characters"),
        last_name: Yup.string().required("Last name is required").max(100, "Max 100 characters"),
        phone: Yup.string().matches(/^[0-9()+\-\s]{7,15}$/,'Invalid phone number').required('Phone is required'),
        photo: Yup.mixed()
            .required("Cover image is required")
            .test("fileOrUrl", "Only images or valid URLs allowed", (value) => {
                if (!value) return false;

                // Caso 1: File
                if (value instanceof File) {
                    return ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(value.type);
                }

                // Caso 2: URL string
                if (typeof value === "string") {
                    try {
                        const url = new URL(value);
                        return true; // si parsea bien, es URL válida
                    } catch {
                        return false;
                    }
                }

                return false;
            })
            .test("fileSize", "Max size is 5MB", (value) => {
                if (value instanceof File) {
                    return value.size <= 5 * 1024 * 1024;
                }
                return true; // si es URL, no aplica límite de tamaño
            }),
        role_code: Yup.string().required("Role is required"),
        organization: Yup.string().required("Organization is required"),
        relation: Yup.string().required("Relation is required"),
        experience_ids: Yup.array().of(
                Yup.number(),
            ).min(1, "At least one experience is required"),
    });

    const handleSubmit = async (values) => {
        try {
            console.log(values);
            onLoad(true);
            // let isDecline = await declineExperience(experienceId,values);
            let isDecline = {};
            onLoad(false);
            // history.goBack();
            showErrorAlert({ title: '', message: isDecline.detail ?? 'The experience has been declined successfully.' });
        } catch (error) {
            handleApiError(error, {
                onServerError: ()=>showErrorAlert({ title: 'Error', message: 'Error declining the experience. Please try again later.' }),
            });
        }
    }

    return (
        <Modal show={show} onHide={onClose} centered size="lg" backdrop="static" dialogClassName="team-admin-add-member-modal">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {(formik) => {
                    const onCancelHandle = () => {
                        formik.resetForm({
                            values: {
                                id: 0,
                                email: "",
                                first_name: "",
                                last_name: "",
                                phone: "",
                                photo: null,
                                role_code: "PROFILE_MANAGEMENT",
                                organization: "",
                                relation: "",
                            }
                        });
                        onClose();
                    }

                    return (<Form>
                        <div className="team-admin-add-member">
                            {/* HEADER */}
                            <div className="team-admin-add-member__title">
                                Add New Member
                            </div>
                            {/* CONTENT */}
                            <div className="team-admin-add-member__card">
                                <div className="team-admin-add-member__section">
                                    <div className="team-admin-add-member__section-title">
                                        Information
                                    </div>
                                    <div className="team-admin-add-member__field">
                                        <label>Name</label>
                                        <div className="team-admin-add-member__input">
                                            <input name="first_name" value={formik.values.first_name} onChange={formik.handleChange} className="tap-add-experience-2-input" maxLength={100} />
                                        </div>
                                        <ErrorMessage name="first_name" component="div" className="tap-add-experience-text text-danger" />
                                    </div>
                                    <div className="team-admin-add-member__field">
                                        <label>Surname</label>
                                        <div className="team-admin-add-member__input">
                                            <input name="last_name" value={formik.values.last_name} onChange={formik.handleChange} className="tap-add-experience-2-input" maxLength={100} />
                                        </div>
                                        <ErrorMessage name="last_name" component="div" className="tap-add-experience-text text-danger" />
                                    </div>
                                    <div className="team-admin-add-member__field">
                                        <label>Email</label>
                                        <div className="team-admin-add-member__input">
                                            <input name="email" value={formik.values.email} onChange={formik.handleChange} className="tap-add-experience-2-input" maxLength={100} />
                                        </div>
                                        <ErrorMessage name="email" component="div" className="tap-add-experience-text text-danger" />
                                    </div>
                                    <div className="team-admin-add-member__field">
                                        <label>Phone number</label>
                                        <div className="team-admin-add-member__input">
                                            <input name="phone" value={formik.values.phone} onChange={formik.handleChange} className="tap-add-experience-2-input" maxLength={100} />
                                        </div>
                                        <ErrorMessage name="phone" component="div" className="tap-add-experience-text text-danger" />
                                    </div>
                                    <div className="team-admin-add-member__field">
                                        <label>Photo</label>
                                        <ImageField />
                                        <ErrorMessage name="photo" component="div" className="tap-add-experience-text text-danger" />
                                    </div>
                                </div>

                                {/* ASSIGN EXPERIENCE */}
                                <div className="team-admin-add-member__field">
                                    <label>Assign experience</label>
                                    <div className="team-admin-add-member__input team-admin-add-member__input--select">
                                        <Dropdown className="w-100">
                                            <Dropdown.Toggle className="btn btn-light w-100 d-flex justify-content-between">
                                                {formik.values.experience_ids.length > 0
                                                ? `${formik.values.experience_ids.length} selected`
                                                : 'Select experiences'}
                                                <i className="bi bi-chevron-down" />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="w-100 p-3">
                                                {(experiences ?? []).map((exp) => {
                                                    const checked = formik.values.experience_ids.includes(exp.id)
                                                    return (<Dropdown.Item as="div" key={exp.id} className="px-0">
                                                        <label className="form-check mb-2 w-100">
                                                            <input type="checkbox" className="form-check-input" checked={checked} 
                                                            onChange={(e) => {
                                                                const next = e.target.checked 
                                                                    ? [...formik.values.experience_ids, exp.id]
                                                                    : formik.values.experience_ids.filter((id) => id !== exp.id);
                                                                console.log('experience_ids',next);
                                                                formik.setFieldValue('experience_ids', next)
                                                            }}/>
                                                            <span className="form-check-label ms-2">
                                                                {exp.title}
                                                            </span>
                                                        </label>
                                                    </Dropdown.Item>)
                                                })}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <ErrorMessage name="experience_ids" component="div" className="tap-add-experience-text text-danger" />
                                </div>
                            </div>

                            {/* FOOTER */}
                            <div className="team-admin-add-member__footer">
                                <button type='button' className="decline-experience__btn decline-experience__btn--secondary" onClick={onCancelHandle}>
                                    Cancel
                                </button>

                                <button type='submit' className="decline-experience__btn decline-experience__btn--primary">
                                    Add Member
                                    &nbsp;<KTSVG path='/media/svg/nobilis/vector02.svg' />
                                </button>
                            </div>
                        </div>
                    </Form>);
                }}
            </Formik>
        </Modal>
    )
}
