import { Formik, Form } from "formik";
import { FC, useEffect, useRef, useState } from "react";
import { Step2 } from "./components/AddExperienceSteps/steps/Step2";
import { Step3 } from "./components/AddExperienceSteps/steps/Step3";
import { useLayout } from "../../../_metronic/layout/core";
import * as Yup from 'yup'
import { rangeSchema } from "../../helpers/FormatInputs";
import { showErrorAlert } from "../../helpers/alert";
import { RequiredInfoModal } from "./components/RequiredInfoModal";
import { useHistory, useParams } from "react-router-dom";
import { addImagesToExperience, createExperience, getAudiences, getConfidentialityLevels, getDetailExperience, getDurations, updateExperience } from "../../services/teamExperienceService";
import { LoaderOverlay } from "../../hooks/loader/LoaderOverlay";
import { ICatalogs } from "./models/GenericModel";
import { EXPERIENCE_STATUS } from "./models/ExperienceStatus";
import { ExperienceDetail } from "./models/ExperienceSummaryModel";
import dayjs from 'dayjs'
import { PauseExperienceModal } from "./components/PauseExperienceModal";

const EditExperiencePage: FC = () => {
    const [step, setStep] = useState(1);
    const formikRef = useRef();
    const [idSaved, setIdSaved] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [messageLoader, setMessageLoader] = useState("Loading...");
    const [messageModal, setMessageModal] = useState("");
    const history = useHistory()
    // modo edicion
    const { id } = useParams();
    const [experience, setExperience] = useState<ExperienceDetail>({});
    const [showModalPause, setShowModalPause] = useState(false);
    // catalogos
    const [catalogs, setCatalogs] = useState<ICatalogs>({
        audiences: [],
        durations: [],
        confidentialities: [],
    });

    const { config, setLayout } = useLayout()
    const restoreRef = useRef(config)

    useEffect(() => {
        restoreRef.current = config
        setLayout({
            ...config,
            header: { ...config.header, display: true },
            aside: { ...config.aside, display: true },
            toolbar: { ...config.toolbar, display: false },
            footer: { ...config.footer, display: true },
        });
        const fetchData = async () => {
            setMessageLoader('Loading...');
            setIsLoader(true);
            const audiences_ = await getAudiences();
            const durations_ = await getDurations();
            const confidentialities_ = await getConfidentialityLevels();
            setCatalogs({
                audiences: audiences_.results,
                durations: durations_.results,
                confidentialities: confidentialities_.results,
            })
            if (id > 0) {
                const experience_ = await getDetailExperience(id);
                if(experience_?.id > 0){
                    setExperience(experience_);
                    await initModeEdition(experience_);
                }else{
                    history.goBack();
                    showErrorAlert({ title: '', message: 'No Experience find' });
                }
            }
            setIsLoader(false);
        }
        fetchData();

        return () => setLayout(restoreRef.current)
    }, [])

    const initModeEdition = async (data: ExperienceDetail) => {
        let mapProperties = {
            /* step1 */
            id: data.id ?? 0,
            experienceType: 'edit',
            /* step2 */
            title: data.title ?? '',
            itinerary: data.itinerary ?? '',
            what_is_included: data.whatIsIncluded ?? '',
            availability_type: data.availabilityType ?? 'by_date',
            dates_data: (data.dates ?? []).map((d: any) => ({
                id: d.id,
                start: dayjs(d.start),
                end: dayjs(d.end),
            })),
            duration_type: data.durationType ?? '2',
            duration: data.duration ?? '',
            price_per_guest: Number(data.pricePerGuest ?? 0),
            price_per_guest_text: data.pricePerGuest ?? '',
            enhancements_data: (data.enhancements ?? []).map((e: any) => ({
                id: e.id,
                name: e.name,
                price: e.price,
            })),
            category_ids: (data.categories ?? []).map((c: any) => c.id),
            location_address: data.locationAddress ?? '',
            arrival_notes: data.arrivalNotes ?? '',
            public: Boolean(data.public),
            allowed_guest_ids: (data.allowedGuestsDetails ?? []).map(
                (g: any) => g.id
            ),
            audience_type: Number(data.audienceType ?? 1),
            guest_capacity_adults: data.guestCapacityAdults ?? '',
            guest_capacity_children: data.guestCapacityChildren ?? '',
            guest_capacity_infants: data.guestCapacityInfants ?? '',
            minimum_age: data.minimalAge ?? '',
            important_information_guest: data.importantInformationGuest ?? '',
            ideal_audience: data.idealAudience ?? '',
            host_presence: data.hostPresence ?? '',
            additional_team_member_ids: (data.additionalTeamMembersDetails ?? []).map(
                (m: any) => m.id
            ),
            beneficiary_for_profit: Boolean(data.beneficiaryForProfit),
            beneficiary_check: Boolean(data.beneficiaryCheck),
            beneficiaries: (data.beneficiaries ?? []).map(
                (g: any) => g.id
            ),
            imageCover: data.coverImage ?? null,
            galleryImages: (data.galleryImages ?? []).map(img => img.image),
            optional_video_link: data.optionalVideoLink ?? '',
            /* step3 */
            confidentiality_type: data.confidentialityType ?? 1,
            confidentiality_check: Boolean(data.confidentialityCheck),
            policy_cancelation_check: Boolean(data.policyCancelationCheck),
            status: data.status ?? EXPERIENCE_STATUS.PENDING,
        };
        await formikRef.current.setValues(mapProperties);
    }

    const initialValues = {
        /* step1  */
        id: 0,
        experienceType: "new",
        /* step2  */
        title: "",
        itinerary: "",
        what_is_included: "",
        availability_type: "by_date",
        dates_data: [],
        duration_type: "2",
        duration: "",
        price_per_guest: 0,
        price_per_guest_text: "",
        enhancements_data: [],
        category_ids: [],
        location_address: "",
        arrival_notes: "",
        public: true,
        allowed_guest_ids: [],
        audience_type: 1,
        guest_capacity_adults: "",
        guest_capacity_children: "",
        guest_capacity_infants: "",
        minimum_age: "",
        important_information_guest: "",
        ideal_audience: "",
        host_presence: "",
        additional_team_member_ids: [],
        beneficiary_for_profit: true,
        beneficiary_check: false,
        beneficiaries: [],
        imageCover: null,
        galleryImages: [],
        optional_video_link: "",
        /* step3  */
        confidentiality_type: 1,
        confidentiality_check: true,
        policy_cancelation_check: true,
        status: EXPERIENCE_STATUS.PENDING,
    };

    const validationSchema = Yup.object({
        /* step1  */
        id: Yup.number(),
        experienceType: Yup.string().required("Please select an option"),
        /* step2  */
        title: Yup.string().required("Experience name is required").max(100, "Max 100 characters"),
        itinerary: Yup.string().required("Itinerary is required").max(500, "Max 500 characters"),
        what_is_included: Yup.string().required("Includes field is required").max(500, "Max 500 characters"),
        availability_type: Yup.string().required("Please select an option"),
        dates_data: Yup.array().of(
            Yup.object().shape({
                start: Yup.string().required("Start date is required"),
                end: Yup.string()
                    .required("End date is required")
                    .test("is-after-start", "End date must be after start date", function (value) {
                        const { start } = this.parent;
                        if (!start || !value) return false;

                        return new Date(value) > new Date(start);
                    }),
            })
        ).when("availability_type", {
            is: "by_date",
            then: (schema) =>
            schema
                .min(1, "Add at least one date")
                .required("Dates are required"),
            otherwise: (schema) => schema.notRequired(),
        }),
        duration_type: Yup.number().required("Selected an duration"),
        duration: Yup.number().required("Enter a number").max(31, "Max 31"),
        price_per_guest_text: Yup.string().required("Enter a number").max(13, "Max $1,000,000,000.00"),
        enhancements_data: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required("Service name is required").max(100, "Max 100 characters"),
                price: Yup.number().required("Service price is required").min(0, 'Min value is 0').max(1000000000, "Max values $1,000,000,000.00")
            })
        ).min(1, "At least one enhancement is required"),
        category_ids: Yup.array().of(
            Yup.string().required("Category is required").max(100, "Max 100 characters"),
        ).min(1, "At least one category is required"),
        location_address: Yup.string().required("Location is required").max(1000000000, "Max length exceeded"),
        arrival_notes: Yup.string().required("Arrival notes are required").max(1000000000, "Max length exceeded"),
        public: Yup.boolean(),
        allowed_guest_ids: Yup.array().of(
            Yup.string()
                .required("Invitee is required")
                .max(100, "Max 100 characters")
        ).when('public', {
            is: 'private',
            then: (schema) =>
                schema.min(1, "At least one invitee is required").required("At least one invitee is required"),
            otherwise: (schema) =>
                schema.notRequired().nullable(true).min(0, ""),
        }),
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
        host_presence: Yup.string().max(100, "Max 100 characters").required("Participation is required"),
        additional_team_member_ids: Yup.array()
            .of(
                Yup.string()
                    .required("Team member is required")
                    .max(100, "Max 100 characters")
            ),
        beneficiary_for_profit: Yup.boolean(),
        beneficiary_check: Yup.boolean().when('beneficiary_for_profit', {
            is: false,
            then: Yup.boolean().oneOf([true], "You must confirm the beneficiary is a non-profit"),
            otherwise: Yup.boolean().notRequired(),
        }),
        beneficiaries: Yup.array()
            .of(
                Yup.string()
                    .required("Beneficiary is required")
                    .max(100, "Max 100 characters")
            ).min(1, "At least one beneficiary is required").required("At least one beneficiary is required"),
        imageCover: Yup.mixed()
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
        galleryImages: Yup.array()
            .of(
                Yup.mixed()
                    .test("fileOrUrl", "Only images or valid URLs allowed", (file) => {
                        if (!file) return false;

                        // Caso 1: File
                        if (file instanceof File) {
                            return file.type?.startsWith("image/");
                        }

                        // Caso 2: URL string
                        if (typeof file === "string") {
                            try {
                                const url = new URL(file);
                                return true;
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
                        return true; // si es URL, no aplica límite
                    })
            )
            .min(2, "At least two images are required"),
        optional_video_link: Yup.string().url("Enter a valid URL").max(200, "Max 200 characters"),
        /* step3  */
        confidentiality_type: Yup.number().required("Please select an option"),
        confidentiality_check: Yup.boolean().oneOf([true], "Policy confirmation is required").required("Policy confirmation is required"),
        policy_cancelation_check: Yup.boolean().oneOf([true], "Cancellation policy confirmation is required").required("Cancellation policy confirmation is required"),
    });

    const handleSubmit = async (values) => {
        let msgError = '';
        try {
            setMessageLoader('Saving your experience...');
            setIsLoader(true);
            let cloneObj = JSON.parse(JSON.stringify({ ...values }));
            delete cloneObj.price_per_guest_text;
            delete cloneObj.experienceType;
            cloneObj.imageCover = null;
            cloneObj.galleryImages = [];
            cloneObj.audience_type = Number(cloneObj.audience_type);
            cloneObj.duration_type = Number(cloneObj.duration_type);
            let response = await updateExperience(values.id, cloneObj);
            // guardamos solo el cover
            let responseImgs = 0;
            if (values.imageCover instanceof File) {
                msgError = 'Failed to upload gallery images.';
                let fm = new FormData();
                fm.append('cover_image', values.imageCover)
                await addImagesToExperience(id, fm);
                responseImgs += 1;
            }else{
                responseImgs += 1;
            }
            const galleryImages = values.galleryImages?.filter(img => img instanceof File)
            if (galleryImages.length > 0) {
                for (let i = 0; i < galleryImages.length; i += 2) {
                    const fm = new FormData()
                    fm.append('upload_gallery_images', galleryImages[i])
                    if (galleryImages[i + 1]) {
                        fm.append('upload_gallery_images', galleryImages[i + 1])
                    }
                    await addImagesToExperience(id, fm)
                    responseImgs += 1;
                }
            }

            setIsLoader(false);
            if (responseImgs > 0) {
                if (values.status == EXPERIENCE_STATUS.DRAFT) {
                    history.replace('/my-experience/draft')
                } else if (values.status == EXPERIENCE_STATUS.PENDING || values.status == EXPERIENCE_STATUS.PUBLISHED) {
                    history.replace('/my-experience/success')
                }
            }
        } catch (error) {
            setIsLoader(false);
            showErrorAlert({ title: '', message: `${msgError} ${error?.message ?? ''}` });
        }
    };

    const handlePause = async () => {
        await formikRef.current.setFieldValue("status",EXPERIENCE_STATUS.DRAFT);
        setShowModalPause(false);
        let haveErrs:boolean = await haveErrors();
        if(!haveErrs){
            await formikRef.current.submitForm();
        }
    }

    const stepFields = {
        1: ["title", "itinerary", "what_is_included", "availability_type", "dates_data", "duration_type", "duration", "price_per_guest_text", "enhancements_data", "category_ids", "location_address",
            "arrival_notes", "public", "allowed_guest_ids", "audience_type", "guest_capacity_adults", "guest_capacity_children", "guest_capacity_infants",
            "important_information_guest", "ideal_audience", "host_presence", "additional_team_member_ids", "beneficiary_for_profit", "beneficiary_check", "beneficiaries", "imageCover", "galleryImages", "optional_video_link"],
        2: ["confidentiality_type", "confidentiality_check", "policy_cancelation_check"],
    };

    const haveErrors = async () => {
        const fieldsToValidate = stepFields[step];
        const errors = await formikRef.current.validateForm();
        const stepErrors = Object.keys(errors).filter((key) =>
            fieldsToValidate.includes(key)
        );
        if (stepErrors.length > 0) {
            setMessageModal(`Please enter '${String(stepErrors[0]).replaceAll('_', ' ')}' to save your progress.`);
            let input = document.querySelector(`input[name='${stepErrors[0]}']`);
            if (!input) {
                input = document.querySelector(`textarea[name='${stepErrors[0]}']`);
            }
            if (!input) {
                input = document.querySelector(`select[name='${stepErrors[0]}']`);
            }
            input?.focus();
            setShowModal(true);
            setTouchedForStep();
            return true;
        }
        return false;
    }

    const setTouchedForStep = () => {
        const fieldsToValidate = stepFields[step];
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

    return (<>
        <Formik innerRef={formikRef} initialValues={initialValues} validationSchema={validationSchema} validateOnMount={true} onSubmit={handleSubmit}>
            {(formik) => {

                const nextStep = async () => {
                    let error = await haveErrors();
                    if (!error) {
                        setStep(step + 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                };

                const backStep = () => setStep(step - 1);

                return (<Form>
                    {step === 1 && (<Step2 catalogs={catalogs} onNextStep={nextStep} onBackStep={backStep} step={step} haveErrors={haveErrors} onPause={setShowModalPause} />)}
                    {step === 2 && (<Step3 catalogs={catalogs} onNextStep={nextStep} onBackStep={backStep} step={step} haveErrors={haveErrors} onPause={setShowModalPause} />)}
                </Form>);
            }}
        </Formik>
        <RequiredInfoModal open={showModal} message={messageModal} onClose={() => setShowModal(false)} />
        <PauseExperienceModal open={showModalPause} onClose={setShowModalPause} onPause={handlePause} />
        <LoaderOverlay visible={isLoader} message={messageLoader} />
    </>
    );
}

export { EditExperiencePage }