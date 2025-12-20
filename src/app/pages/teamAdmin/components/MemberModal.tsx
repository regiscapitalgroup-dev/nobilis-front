import { FC, useEffect, useRef } from 'react'
import { Modal } from 'react-bootstrap-v5'
import { ErrorMessage, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { showErrorAlert } from '../../../helpers/alert'
import { handleApiError, parseApiErrors } from '../../../utils/handleApiError'
import ImageField from './fields/ImageField'
import { KTSVG } from '../../../../_metronic/helpers'
import { SelectExperienceField } from './fields/SelectExperienceField'
import { createTeam, getDetailTeam, updateTeam } from '../../../services/teamAdminService'
import { UserModel } from '../../../modules/auth/models/UserModel'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../setup'

type Props = {
    show: boolean;
    onClose: () => void;
    onSubmit?: () => void;
    onLoad?: (isloaded:boolean) => void;
    userSelectedId: number;
}

export const MemberModal: FC<Props> = ({ show, onClose, onLoad, onSubmit, userSelectedId }) => {
    const user = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
    const formikRef = useRef();

    const getTeam = async () => {
        const team_ = await getDetailTeam(user.id,userSelectedId);
        if(team_?.id == 0) return;
        setFormikValues(team_);
    }

    const setFormikValues = async (team: any) => {
        await formikRef.current.setValues({
            user_id: team?.id,
            email: team?.email ?? "",
            first_name: team?.firstName ?? "",
            last_name: team?.lastName ?? "",
            phone_number: team?.phoneNumber ?? "",
            profile_picture: team?.profilePicture ?? null,
            role_id: team?.roleId ?? 7,
            experience_ids: team?.experiencesIds?.length ? team.experiencesIds : []
        });
    };

    useEffect(()=>{
        if(userSelectedId > 0){
            getTeam();
        }
    },[userSelectedId])

    const initialValues = {
        user_id: 0,
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        profile_picture: null,
        role_id: 7,
        organization: "",
        relation: "",
        experience_ids: [] as number[],
    };

    const validationSchema = Yup.object({
        user_id: Yup.number(),
        email: Yup.string().email('Wrong email format').min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required('Email is required'),
        first_name: Yup.string().required("Name is required").max(100, "Max 100 characters"),
        last_name: Yup.string().required("Last name is required").max(100, "Max 100 characters"),
        phone_number: Yup.string().matches(/^[0-9()+\-\s]{7,15}$/,'Invalid phone number').required('Phone is required'),
        profile_picture: Yup.mixed()
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
        role_id: Yup.number()/* .required("Role is required") */,
        organization: Yup.string()/* .required("Organization is required") */,
        relation: Yup.string()/* .required("Relation is required") */,
        experience_ids: Yup.array().of(
                Yup.number(),
            ).min(1, "At least one experience is required"),
    });

    const handleSubmit = async (values) => {
        try {
            onLoad(true);
            let msg = '';
            let cloneObj = JSON.parse(JSON.stringify({...values}));
            const formData = new FormData();
            formData.append('user_id', values.user_id);
            formData.append('email', values.email);
            formData.append('first_name', values.first_name);
            formData.append('last_name', values.last_name);
            formData.append('phone_number', values.phone_number);
            if(values.profile_picture instanceof File){
                formData.append('profile_picture', values.profile_picture);
            }
            formData.append('organization', values.organization ?? '');
            formData.append('relation', values.relation ?? '');
            if(values.experience_ids.length > 1){
                let ids = (values.experience_ids ?? []).map((item)=>{
                    formData.append('experience_ids', item);
                });
            }else{
                let ids = (values.experience_ids ?? []).map((item)=>{
                    formData.append('experience_ids[]', item);
                });
            }
            if(values?.user_id == 0){
                delete cloneObj.profile_picture; // photo se maneja aparte en create
                let isCreated = await createTeam(formData);
                msg = isCreated.ok || isCreated.email ? 'The team member has been created successfully.' : 'Unable to create team member.';
            }else{
                // actualizamos info
                formData.append('role_id', 7);
                let isUpdate = await updateTeam(user.id,values.user_id,formData);
                msg = isUpdate.id ? 'The team member has been updated successfully.' : 'Unable to update team member.';
            }
            onLoad(false);
            onSubmit();
            showErrorAlert({ title: '', message: msg ?? 'The experience has been declined successfully.' });
        } catch (error) {
            onLoad(false);
            handleApiError(error, {
                onServerError: ()=>showErrorAlert({ title: 'Error', message: 'Error declining the experience. Please try again later.' }),
                onBadRequest: (data)=>{
                    let msg = parseApiErrors(data);
                    showErrorAlert({ title: 'Error', message: msg })
                }
            });
        }
    }

    return (
        <Modal show={show} onHide={onClose} centered size="lg" backdrop="static" dialogClassName="team-admin-add-member-modal">
            <Formik innerRef={formikRef} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {(formik) => {
                    const onCancelHandle = () => {
                        formik.resetForm({
                            values: {
                                user_id: 0,
                                email: "",
                                first_name: "",
                                last_name: "",
                                phone_number: "",
                                profile_picture: null,
                                role_id: 5,
                                organization: "",
                                relation: "",
                                experience_ids: [],
                            }
                        });
                        onClose();
                    }

                    const handleExperienciesChange = (value:string) => {
                        formik.setFieldValue("experience_ids", value);
                        formik.validateForm();
                    };

                    return (<Form>
                        <div className="team-admin-add-member">
                            {/* HEADER */}
                            <div className="team-admin-add-member__title">
                                {formik.values.user_id == 0 ? 'Add New' : 'Edit'} Member
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
                                            <input name="phone_number" value={formik.values.phone_number} onChange={formik.handleChange} className="tap-add-experience-2-input" maxLength={100} />
                                        </div>
                                        <ErrorMessage name="phone_number" component="div" className="tap-add-experience-text text-danger" />
                                    </div>
                                    <div className="team-admin-add-member__field">
                                        <label>Photo</label>
                                        <ImageField />
                                        <ErrorMessage name="profile_picture" component="div" className="tap-add-experience-text text-danger" />
                                    </div>
                                </div>

                                {/* ASSIGN EXPERIENCE */}
                                <div className="team-admin-add-member__field">
                                    <label>Assign experience</label>
                                    <SelectExperienceField values={formik.values.experience_ids} onChange={handleExperienciesChange}/>
                                    <ErrorMessage name="experience_ids" component="div" className="tap-add-experience-text text-danger" />
                                </div>
                            </div>

                            {/* FOOTER */}
                            <div className="team-admin-add-member__footer">
                                <button type='button' className="decline-experience__btn decline-experience__btn--secondary" onClick={onCancelHandle}>
                                    Cancel
                                </button>

                                <button type='submit' className="decline-experience__btn decline-experience__btn--primary">
                                    {formik.values.user_id == 0 ? 'Add' : 'Edit'} Member
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
