import { EXPERIENCE_STATUS } from '../../models/ExperienceStatus'
import * as Yup from 'yup'
import { rangeSchema } from '../../../../helpers/FormatInputs';

const validationSchemaForDraft = Yup.object({
    /* step1  */
    id: Yup.number(),
    experienceType: Yup.string().required("Please select an option"),
    /* step2  */
    host_type: Yup.string().required("Please select an option"),
    host_id: Yup.number().required("Select the host of the experience").min(1,"Select the host of the experience"),
    title: Yup.string().required("Experience name is required").max(100, "Max 100 characters"),
    itinerary: Yup.string().max(500, "Max 500 characters"),
    what_is_included: Yup.string().max(500, "Max 500 characters"),
    availability_type: Yup.string(),
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
        then: (schema) => schema.notRequired(),
        otherwise: (schema) => schema.notRequired(),
    }),
    duration_type: Yup.number(),
    duration: Yup.number(),
    price_per_guest_text: Yup.string().max(13,"Max $1,000,000,000.00"),
    enhancements_data: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required("Service name is required").max(100, "Max 100 characters"),
            price: Yup.number().required("Service price is required").min(0,'Min value is 0').max(1000000000,"Max values $1,000,000,000.00")
        })
    ),
    category_ids: Yup.array().of(
        Yup.string().required("Category is required").max(100, "Max 100 characters"),
    ).notRequired(),
    location_address: Yup.string().max(1000000000,"Max length exceeded"),
    arrival_notes: Yup.string().max(1000000000,"Max length exceeded"),
    public: Yup.boolean(),
    allowed_guest_ids: Yup.array().of(
            Yup.string()
            .required("Invitee is required")
            .max(100, "Max 100 characters").notRequired()
        ),
    audience_type: Yup.number(),
    guest_capacity_adults: rangeSchema(false),
    guest_capacity_children: rangeSchema(false),
    guest_capacity_infants: rangeSchema(false),
    important_information_guest: Yup.string().max(250, "Max 250 characters"),
    ideal_audience: Yup.string().max(250, "Max 250 characters"),
    host_presence: Yup.string().max(100, "Max 100 characters"),
    additional_team_member_ids: Yup.array()
        .of(
            Yup.string()
            .required("Team member is required")
            .max(100, "Max 100 characters")
        ).notRequired(),
    beneficiary_for_profit: Yup.boolean(),
    beneficiary_check: Yup.boolean().when('beneficiary_for_profit', {
        is: false,
        then: Yup.boolean().oneOf([true], "You must confirm the beneficiary is a non-profit"),
        otherwise: Yup.boolean().notRequired(),
    }),
    beneficiaries: Yup.array()
        .of(
            Yup.string()
            .max(100, "Max 100 characters")
        ).notRequired(),
    imageCover: Yup.mixed()
        .notRequired()
        .nullable()
        .test('fileType','Only images allowed',
            (value) => {
                if (!value) return true; // 👈 si no hay valor, pasa
                if (value instanceof File) {
                    return ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(value.type)
                }
                return false
            })
        .test('fileSize', 'Max size is 5MB',
            (value) => {
                if (!value) return true // 👈 clave
                if (value instanceof File) {
                    return value.size <= 5 * 1024 * 1024
                }
                return true
            }),
    galleryImages: Yup.array()
        .notRequired()
        .nullable()
        .of(
            Yup.mixed()
            .test('fileType', 'Only images allowed',
                (file) => {
                    if (!file) return true // 👈 permite vacío
                    if (file instanceof File) {
                        return file.type.startsWith('image/')
                    }
                    return false
                })
            .test('fileSize', 'Max size is 5MB',
                (file) => {
                    if (!file) return true
                    if (file instanceof File) {
                        return file.size <= 5 * 1024 * 1024
                    }
                    return true
                })
        ),
    optional_video_link: Yup.string().url("Enter a valid URL").max(200, "Max 200 characters"),
    /* step3  */
    confidentiality_type: Yup.number(),
    confidentiality_check: Yup.boolean(),
    policy_cancelation_check: Yup.boolean(),
});

const validationSchemaForPending = Yup.object({
    /* step1  */
    id: Yup.number(),
    experienceType: Yup.string().required("Please select an option"),
    /* step2  */
    host_type: Yup.string().required("Please select an option"),
    host_id: Yup.number().required("Select the host of the experience").min(1,"Select the host of the experience"),
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
    duration: Yup.number().required("Enter a number").max(31,"Max 31"),
    price_per_guest_text: Yup.string().required("Enter a number").max(13,"Max $1,000,000,000.00"),
    enhancements_data: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required("Service name is required").max(100, "Max 100 characters"),
            price: Yup.number().required("Service price is required").min(0,'Min value is 0').max(1000000000,"Max values $1,000,000,000.00")
        })
    ),
    category_ids: Yup.array().of(
        Yup.string().required("Category is required").max(100, "Max 100 characters"),
    ).min(1, "At least one category is required"),
    location_address: Yup.string().required("Location is required").max(1000000000,"Max length exceeded"),
    arrival_notes: Yup.string().required("Arrival notes are required").max(1000000000,"Max length exceeded"),
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
                schema.notRequired().nullable(true).min(0,""),
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
        .test("fileType", "Only images allowed", (value) => {
            if (!value) return false;
            return ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(value.type);
        })
        .test("fileSize", "Max size is 5MB", (value) => {
            if (!value) return false;
            return value.size <= 5 * 1024 * 1024;
        }),
    galleryImages: Yup.array()
        .of(
            Yup.mixed().test("fileType", "Only images allowed", (file) => {
                if (!file) return false;
                return file.type.startsWith("image/");
            })
            .test("fileSize", "Max size is 5MB", (value) => {
                if (!value) return false;
                return value.size <= 5 * 1024 * 1024;
            })
        )
        .min(2, "At least two image is required"),
    optional_video_link: Yup.string().url("Enter a valid URL").max(200, "Max 200 characters"),
    /* step3  */
    confidentiality_type: Yup.number().required("Please select an option"),
    confidentiality_check: Yup.boolean().oneOf([true], "Policy confirmation is required").required("Policy confirmation is required"),
    policy_cancelation_check: Yup.boolean().oneOf([true], "Cancellation policy confirmation is required").required("Cancellation policy confirmation is required"),
});

const validateShowButtonActions = (key: 'draft' | 'paused' | 'publish', formik:any) => {
    let show = '';
    switch (key) {
        case 'draft':
            if(formik.values?.id > 0){
                if([EXPERIENCE_STATUS.PUBLISHED, EXPERIENCE_STATUS.PRE_LAUNCH ].includes(formik.values?.status)){
                    show = 'd-none';
                }
            }
            break;
        case 'paused':
            if([EXPERIENCE_STATUS.PUBLISHED, EXPERIENCE_STATUS.PRE_LAUNCH ].includes(formik.values?.status)){
                show = 'd-none';
            }
            break;
        case 'publish':
            show = formik.values?.id > 0 ? '' : 'd-none'
            break;
        default:
            break;
    }
    return show
}

export { validateShowButtonActions, validationSchemaForDraft, validationSchemaForPending };