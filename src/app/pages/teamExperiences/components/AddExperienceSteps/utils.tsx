import { EXPERIENCE_STATUS } from '../../models/ExperienceStatus'

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

export { validateShowButtonActions }