import {useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {IUpdatePassword, updatePassword} from '../models/UserSettingsModel'
import {activateAccount} from '../redux/AuthCRUD'
import {TermsConditionsModal} from './_modals/TermsConditionsModal'
import {useAlert} from '../../../hooks/utils/useAlert'

const passwordFormValidationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, 'The password must be at least 8 characters long.')
    .matches(/[A-Z]/, 'The password must contain at least one capital letter.')
    .matches(/[a-z]/, 'The password must contain at least one lowercase letter.')
    .matches(/[0-9]/, 'The password must contain at least one number.')
    .matches(/[^A-Za-z0-9]/, 'The password must contain at least one special character.')
    .required('This field is required'),
  passwordConfirmation: Yup.string()
    .required('This field is required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
})

export function CreatePassword() {
  const [loading, setLoading] = useState<boolean>(false)
  const [passwordUpdateData, setPasswordUpdateData] = useState<IUpdatePassword>(updatePassword)
  const [accepted, setAccepted] = useState<boolean>(false)
  const {token, user} = useParams<{token: string; user: string}>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [showPwd, setShowPwd] = useState(false)
  const [showPwd2, setShowPwd2] = useState(false)
  const navigate = useHistory()
  const {showError} = useAlert()

  const formik = useFormik<IUpdatePassword>({
    initialValues: {
      ...passwordUpdateData,
    },
    validationSchema: passwordFormValidationSchema,
    onSubmit: async (values) => {
      setLoading(true)

      if (token) {
        await activateAccount(token, values.newPassword)
          .then(() => {
            setPasswordUpdateData(values)
            setLoading(false)

            navigate.replace('/message', {
              title: 'Thanks for reseting your password!',
              body: 'Updates have been made. Let’s continue to membership details and confirmation.',
              ctaText: 'Continue',
              ctaTo: '/auth/login',
              classNameBtn: 'nb-btn-outline',
              showBtn: true,
              color: 'W',
            })
          })
          .catch((error: any) => {
            setLoading(false)
            const statusCode = error?.response?.status || 500
            showError({
              title: 'Password Setup Unavailable',
              message:
                'There was a problem creating your password. Please check your activation details or try again later.',
              errorCode: `AUTH_CREATE_${statusCode}`,
            })
          })
      }
    },
  })

  return (
    <>
      <div className='text-center mb-10'>
        <h1 className='nb-heading-h2 nb-text-center mb-3'>{`Welcome to Nobilis, ${user}! Honored to have you among the world’s most accomplished`}</h1>
        <div className='nb-body nb-center nb-muted'>To begin, please reset your password.</div>
      </div>
      <form
        className='form w-100'
        noValidate
        id='kt_login_password_reset_form'
        onSubmit={formik.handleSubmit}
      >
        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <label className='nb-tag'>New Password</label>

          <div className='nb-input-wrap'>
            <input
              autoComplete='off'
              type={showPwd ? 'text' : 'password'}
              className='form-control form-control-lg form-control-underline input-text-style'
              id='newpassword'
              {...formik.getFieldProps('newPassword')}
            />
            <button
              type='button'
              className='nb-input-eye'
              aria-label={showPwd ? 'Hide password' : 'Show password'}
              onClick={() => setShowPwd((s) => !s)}
              tabIndex={-1} 
            >
              <i className={`bi ${showPwd ? 'bi-eye-slash' : 'bi-eye'}`}></i>
            </button>
          </div>

          {formik.touched.newPassword && formik.errors.newPassword && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block input-text-style fs-8'>{formik.errors.newPassword}</div>
            </div>
          )}
        </div>
        <div className='fv-row mb-10'>
          <label className='nb-tag'>Confirm New Password</label>
          <div className='nb-input-wrap'>
            <input
              type={showPwd2 ? 'text' : 'password'}
              autoComplete='off'
              className='form-control form-control-lg form-control-underline  input-text-style'
              id='confirmpassword'
              {...formik.getFieldProps('passwordConfirmation')}
            />
            <button
              type='button'
              className='nb-input-eye'
              aria-label={showPwd2 ? 'Hide password' : 'Show password'}
              onClick={() => setShowPwd2((s) => !s)}
              tabIndex={-1} 
            >
              <i className={`bi ${showPwd2 ? 'bi-eye-slash' : 'bi-eye'}`}></i>
            </button>
          </div>

          {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block input-text-style fs-8'>
                {formik.errors.passwordConfirmation}
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center gap-2 cursor-pointer'>
            <span className='nbq-check nb3-check' style={{flexShrink: 0}}>
              <input
                className='form-check-input'
                type='checkbox'
                id='flexCheckDefault'
                checked={accepted}
                onChange={(e) => {
                  setAccepted(e.target.checked)
                }}
              />
            </span>
            <span className='nb-checkbox-text'>
              I agree to the Nobilis{' '}
              <a className='nb-checkbox-link cursor-pointer' onClick={() => setOpenModal(true)}>
                Member's Terms and Condition.
              </a>
            </span>
          </label>
        </div>

        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='text-center'>
          <button
            type='submit'
            id='kt_password_reset_submit'
            className='btn nb-btn-outline w-100  nb-heading-md'
            disabled={!accepted}
          >
            {!loading && (
              <>
                <span className='indicator-label'>CHANGE PASSWORD</span>
                <img
                  src='/media/svg/nobilis/vector1.svg'
                  alt=''
                  className='nb-btn-icon nb-btn-icon--black'
                />
              </>
            )}

            {loading && (
              <span className='indicator-progress nb-heading-md' style={{display: 'block'}}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Form group */}
      </form>

      <TermsConditionsModal
        show={openModal}
        handleClose={() => {
          setOpenModal(!openModal)
        }}
      ></TermsConditionsModal>

    </>
  )
}
