import { Formik, Form } from "formik";
import { FC, useEffect, useRef, useState } from "react";
import { Step1 } from "./components/AddExperienceSteps/steps/Step1";
import { Step2 } from "./components/AddExperienceSteps/steps/Step2";
import { Step3 } from "./components/AddExperienceSteps/steps/Step3";
import { useLayout } from "../../../_metronic/layout/core";
import { showErrorAlert } from "../../helpers/alert";
import { RequiredInfoModal } from "./components/RequiredInfoModal";
import { useHistory } from "react-router-dom";
import { addImagesToExperience, createExperience, getAudiences, getConfidentialityLevels, getDurations, updateExperience } from "../../services/teamExperienceService";
import { LoaderOverlay } from "../../hooks/loader/LoaderOverlay";
import { ICatalogs } from "./models/GenericModel";
import { EXPERIENCE_STATUS } from "./models/ExperienceStatus";
import { validationSchemaForDraft, validationSchemaForPending } from "./components/AddExperienceSteps/utils";

export type Props = {
    step: number;
    onStep?: () => void;
    onBackStep: () => void;
    onNextStep: () => void;
    haveErrors: () => Promise<boolean>;
    onLoad?: (load:boolean) => void;
    onLoadMessage?: (msg:string) => void;
    onPause?: (show:boolean) => void;
    catalogs?: ICatalogs
    onSaveDraft?: () => void;
}

const AddExperiencePage: FC = () => {
    const [step, setStep] = useState(1);
    const formikRef = useRef();
    const [idSaved, setIdSaved] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [messageLoader, setMessageLoader] = useState("Loading...");
    const [messageModal, setMessageModal] = useState("");
    const history = useHistory()
    // validate status
    const [statusDraft, setStatusDraft] = useState(false);
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
            // setIsLoader(true);
            const audiences_ = await getAudiences();
            const durations_ = await getDurations();
            const confidentialities_ = await getConfidentialityLevels();
            setCatalogs({
                audiences: audiences_.results,
                durations: durations_.results,
                confidentialities: confidentialities_.results,
            })
            // setIsLoader(false);
        }
        fetchData();

        return () => setLayout(restoreRef.current)
    }, [])

    const initialValues = {
        /* step1  */
        id: 0,
        experienceType: "new",
        /* step2  */
        host_id: 0,
        host_type: "partner",
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
        confidentiality_check: false,
        policy_cancelation_check: false,
        status: EXPERIENCE_STATUS.PENDING,
    };

    const handleSubmit = async (values) => {
        let msgError = '';
        try {
            setMessageLoader('Saving your experience...');
            setIsLoader(true);
            let cloneObj = JSON.parse(JSON.stringify({...values}));
            delete cloneObj.imageCover;
            delete cloneObj.galleryImages;
            delete cloneObj.price_per_guest_text;
            delete cloneObj.experienceType;
            cloneObj.audience_type = Number(cloneObj.audience_type);
            cloneObj.duration_type = Number(cloneObj.duration_type);
            cloneObj.duration =  String(cloneObj.duration) != "" ? String(cloneObj.duration) : "1";
            cloneObj.host_id = Number(cloneObj.host_id);
            let id = idSaved;
            if(id == 0){
                msgError = 'Failed to save experience.';
                let response = await createExperience(cloneObj);
                id = response.id;
                setIdSaved(id);
            }else{
                msgError = 'Failed to update experience.';
            }
            // guardamos solo el cover validamos en caso de draft o no contenga imagenes
            if(values.imageCover){
                msgError = 'Failed to upload gallery images.';
                let fm = new FormData();
                fm.append('cover_image',values.imageCover)
                let responseImgs = 0;
                await addImagesToExperience(id, fm);
            }

            let galleryImages = values.galleryImages ?? []
            if (galleryImages.length > 0) {
                for (let i = 0; i < galleryImages.length; i += 2) {
                    let fm = new FormData();
                    const img1 = galleryImages[i];
                    const img2 = galleryImages[i + 1];
                    // Siempre agregas la primera
                    fm.append("upload_gallery_images", img1);
                    // La segunda solo si existe (por si es impar)
                    if (img2) {
                        fm.append("upload_gallery_images", img2);
                    }
                    await addImagesToExperience(id, fm);
                    responseImgs += 1;
                }
            }
            setIsLoader(false);
            if(id > 0){
                if(values.status == EXPERIENCE_STATUS.DRAFT){
                    history.replace('/my-experience/draft')
                }else if(values.status == EXPERIENCE_STATUS.PENDING || values.status == EXPERIENCE_STATUS.PUBLISHED){
                    history.replace('/my-experience/success')
                }
            }
        } catch (error) {
            setIsLoader(false);
            showErrorAlert({ title: '', message: `${msgError} ${error?.message ?? ''}` });
        }
    };

    const handleOnDraft = async () => {
        await setStatusDraft(true);
        let error = await haveErrors();
        if (!error) {
            await formikRef.current.setFieldValue("status",EXPERIENCE_STATUS.DRAFT);
            formikRef.current.submitForm();
        }else{
            await setStatusDraft(false);
        }
    }

    const stepFields = {
        1: ["experienceType"],
        2: ["host_id","host_type","title", "itinerary", "what_is_included", "availability_type", "dates_data", "duration_type", "duration", "price_per_guest_text", "enhancements_data", "category_ids", "location_address",
            "arrival_notes", "public", "allowed_guest_ids", "audience_type", "guest_capacity_adults", "guest_capacity_children", "guest_capacity_infants",
            "important_information_guest", "ideal_audience", "host_presence", "additional_team_member_ids", "beneficiary_for_profit", "beneficiary_check", "beneficiaries", "imageCover", "galleryImages", "optional_video_link"],
        3: ["confidentiality_type","confidentiality_check","policy_cancelation_check"],
    };

    const haveErrors = async () => {
        const fieldsToValidate = stepFields[step];
        const errors = await formikRef.current.validateForm();
        const stepErrors = Object.keys(errors).filter((key) =>
            fieldsToValidate.includes(key)
        );
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
        <Formik innerRef={formikRef} initialValues={initialValues} validationSchema={statusDraft ? validationSchemaForDraft : validationSchemaForPending} validateOnMount={true} onSubmit={handleSubmit}>
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
                    {step === 1 && (<Step1 catalogs={catalogs} onNextStep={nextStep} onBackStep={backStep} step={step} haveErrors={haveErrors} onPause={()=>{}} />)}
                    {step === 2 && (<Step2 catalogs={catalogs} onNextStep={nextStep} onBackStep={backStep} step={step} haveErrors={haveErrors} onPause={()=>{}} onSaveDraft={handleOnDraft} />)}
                    {step === 3 && (<Step3 catalogs={catalogs} onNextStep={nextStep} onBackStep={backStep} step={step} haveErrors={haveErrors} onPause={()=>{}} onSaveDraft={handleOnDraft} />)}
                </Form>);
            }}
        </Formik>
        <RequiredInfoModal open={showModal} message={messageModal} onClose={() => setShowModal(false)} />
        <LoaderOverlay visible={isLoader} message={messageLoader} />
        </>
    );
}

export { AddExperiencePage }