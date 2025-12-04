import { Formik, Form, useFormikContext } from "formik";
import { FC, useEffect, useRef, useState } from "react";
import { Step1 } from "./components/AddExperienceSteps/Step1";
import { Step2 } from "./components/AddExperienceSteps/Step2";
import { Step3 } from "./components/AddExperienceSteps/Step3";
import { useLayout } from "../../../_metronic/layout/core";
import * as Yup from 'yup'
import { rangeSchema } from "../../helpers/FormatInputs";
import { showErrorAlert } from "../../helpers/alert";

export type Props = {
    step: number;
    onStep: () => void;
    onBackStep: () => void;
    onNextStep: () => void;
}

const AddExperiencePage: FC = () => {
    const [step, setStep] = useState(1);
    const formikRef = useRef();

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
        })

        return () => setLayout(restoreRef.current)
    }, [])

    const initialValues = {
        /* step1  */
        experienceType: "new",
        /* step2  */
        title: "", // ya
        description: "No description", // no hay campo de descripcion
        itinerary: "", // ya
        what_is_included: "", // ya
        availability_type: "by_date", // ya
        dates_data: [], // ya
        durationType: "2",// falta este campo es un selector en horas, dias o semanas
        duration: "", // ya
        price_per_guest: "", // ya
        enhancements_data: [], // no tenemos el campop para descripcion
        category_ids: [], // ya
        location_address: "", // ya
        arrival_notes: "", // ya
        inviteGuestType: "public", // este campos es para Invite Guests determina si es publico o privado si es privado se activan los invitees
        invitees: [],
        audienceType: "family", // determina el tipo de audiencia family o adults. si es adults no se piden children e infants
        guest_capacity_adults: "", // aqui en mookup muestra que debe ser 0-10 (min-max)
        guest_capacity_children: "", // aqui en mookup muestra que debe ser 0-10 (min-max)
        guest_capacity_infants: "", // aqui en mookup muestra que debe ser 0-10 (min-max)
        minimum_age: "", // no esta en el formulario
        important_information_guest: "", // ya
        idealAudience: "",
        participation: "",
        additionalTeamMembers: [],
        beneficiaryType: "forProfit",
        beneficiaryCheck: false,
        beneficiaries: [],
        imageCover: null,
        galleryImages: [],
        optional_video_link: "",
        /* step3  */
        confidentialityType: "",
        policyCheck: false,
        policyCancelationCheck: false,
    };

    const validationSchema = Yup.object({
        /* step1  */
        experienceType: Yup.string().required("Please select an option"),
        /* step2  */
        title: Yup.string().required("Experience name is required").max(100, "Max 100 characters"),
        itinerary: Yup.string().required("Itinerary is required").max(200, "Max 200 characters"),
        what_is_included: Yup.string().required("Includes field is required").max(200, "Max 200 characters"),
        availability_type: Yup.string().required("Please select an option"),
        dates_data: Yup.array().of(
            Yup.object().shape({
                start: Yup.date().required("Start date is required"),
                end: Yup.date().required("End date is required")
                    .min(Yup.ref("start"),"End date must be after start date"),
            })
        ).min(1,"Add at least one date").required('dates required'),
        durationType: Yup.number().required("Enter a number"),
        duration: Yup.number().required("Enter a number").max(31,"Max 31"),
        price_per_guest: Yup.string().required("Enter a number").max(13,"Max $1,000,000,000.00"),
        enhancements_data: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required("Service name is required").max(100, "Max 100 characters"),
                price: Yup.number().required("Service price is required").min(0,'Min value is 0').max(1000000000,"Max values $1,000,000,000.00")
            })
        ).min(1, "At least one enhancement is required"),
        category_ids: Yup.array().of(
            Yup.string().required("Category is required").max(100, "Max 100 characters"),
        ).min(1, "At least one category is required"),
        location_address: Yup.string().required("Location is required").max(1000000000,"Max length exceeded"),
        arrival_notes: Yup.string().required("Arrival notes are required").max(1000000000,"Max length exceeded"),
        invitees: Yup.array().of(
                Yup.string()
                .required("Invitee is required")
                .max(100, "Max 100 characters")
            ).when('inviteGuestType', {
                is: 'private',
                then: (schema) =>
                    schema.min(1, "At least one invitee is required").required("At least one invitee is required"),
                otherwise: (schema) => 
                    schema.notRequired().nullable(true).min(0,""),
            }),
        audienceType: Yup.string().oneOf(['family', 'adults']).required('Select an audience type'),
        guest_capacity_adults: rangeSchema(true),
        guest_capacity_children: Yup.string().when('audienceType', {
            is: 'family',
            then: rangeSchema(true),     // requerido + formato "min-max"
            otherwise: rangeSchema(false), // no requerido cuando audienceType = 'adults'
        }),
        guest_capacity_infants: Yup.string().when('audienceType', {
            is: 'family',
            then: rangeSchema(true),
            otherwise: rangeSchema(false),
        }),
        important_information_guest: Yup.string().max(100, "Max 100 characters"),
        idealAudience: Yup.string().max(100, "Max 100 characters"),
        participation: Yup.string().max(100, "Max 100 characters").required("Participation is required"),
        additionalTeamMembers: Yup.array()
            .of(
                Yup.string()
                .required("Team member is required")
                .max(100, "Max 100 characters")
            ).min(1, "At least one team member is required").required("At least one team member is required"),
        beneficiaryType: Yup.string().required("Please select an option"),
        beneficiaryCheck: Yup.boolean().when('beneficiaryType', {
            is: 'nonProfit',
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
            .test("fileType", "Only images allowed", (value) => {
                if (!value) return false;
                return ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(value.type);
            }),
        galleryImages: Yup.array()
            .of(
                Yup.mixed().test("fileType", "Only images allowed", (file) => {
                if (!file) return false;
                return file.type.startsWith("image/");
                })
            )
            .min(1, "At least one image is required"),
        optional_video_link: Yup.string().url("Enter a valid URL").max(200, "Max 200 characters"),
        /* step3  */
        confidentialityType: Yup.string().required("Please select an option"),
        policyCheck: Yup.boolean().oneOf([true], "Policy confirmation is required").required("Policy confirmation is required"),
        policyCancelationCheck: Yup.boolean().oneOf([true], "Cancellation policy confirmation is required").required("Cancellation policy confirmation is required"),
    });

    const handleSubmit = async () => {
        showErrorAlert({
            title: 'Comming Soon',
            message: '',
            confirmButtonText: 'OK',
        });
        // const errors = await formikRef.current.validateForm();
        // if (Object.keys(errors).length === 0) {
        //     console.log("FINAL SUBMIT:", formikRef.current.values);
        // } else {
        //     console.log("FINAL ERROR:", errors);
        // }
    };

    const stepFields = {
        1: ["experienceType"],
        2: ["title", "itinerary", "what_is_included", "availability_type", "dates_data", "durationType", "duration", "price_per_guest", "enhancements_data", "category_ids", "location_address",
            "arrival_notes", "inviteGuestType", "invitees", "audienceType", "guest_capacity_adults", "guest_capacity_children", "guest_capacity_infants",
            "important_information_guest", "idealAudience", "participation", "additionalTeamMembers", "beneficiaryType", "beneficiaryCheck", "beneficiaries", "imageCover", "galleryImages", "optional_video_link"],
        3: ["confidentialityType","policyCheck","policyCancelationCheck"],
    };

    return (
        <Formik innerRef={formikRef} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {(formik) => {

                const setTouchedForStep = () => {
                    const fieldsToValidate = stepFields[step];
                    let newTouched: any = {};
                    for (const field of fieldsToValidate) {
                        const value = formik.values[field];
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
                    formik.setTouched({
                        ...formik.touched,
                        ...newTouched,
                    });
                };

                const nextStep = async () => {
                    console.log('campos del formulario',formik.values);
                    formik.validateForm();
                    const fieldsToValidate = stepFields[step];
                    const errors = await formik.validateForm();
                    const stepErrors = Object.keys(errors).filter((key) =>
                        fieldsToValidate.includes(key)
                    );

                    if (stepErrors.length === 0) {
                        setStep(step + 1);
                    } else {
                        showErrorAlert({
                            title: 'Please fix the errors before proceeding',
                            message: 'Some fields are invalid or incomplete.',
                            confirmButtonText: 'OK',
                        });
                        setTouchedForStep();
                    }
                };

                const backStep = () => setStep(step - 1);

                return (<Form>
                    {step === 1 && (<Step1 onNextStep={nextStep} onBackStep={backStep} step={step} />)}
                    {step === 2 && (<Step2 onNextStep={nextStep} onBackStep={backStep} step={step} />)}
                    {step === 3 && (<Step3 onNextStep={nextStep} onBackStep={backStep} step={step} />)}
                </Form>);
            }}
        </Formik>
    );
}

export { AddExperiencePage }