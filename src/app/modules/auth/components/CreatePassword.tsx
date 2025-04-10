import {useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {IUpdatePassword, updatePassword} from '../models/UserSettingsModel'
import Swal from 'sweetalert2'
import {useDispatch} from 'react-redux'
import {activateAccount} from '../redux/AuthCRUD'
import * as auth from '../redux/AuthRedux'
import {TermsConditionsModal} from './_modals/TermsConditionsModal'

const passwordFormValidationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, 'The password must be at least 8 characters long.')
    .matches(/[A-Z]/, 'The password must contain at least one capital letter.')
    .matches(/[a-z]/, 'The password must contain at least one lowercase letter.')
    .matches(/[0-9]/, 'The password must contain at least one number.')
    .matches(/[^A-Za-z0-9]/, 'The password must contain at least one special character.')
    .required('New Password is required'),
  passwordConfirmation: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
})

export function CreatePassword() {
  const [loading, setLoading] = useState<boolean>(false)
  const [passwordUpdateData, setPasswordUpdateData] = useState<IUpdatePassword>(updatePassword)
  const [accepted, setAccepted] = useState<boolean>(false)
  const {token} = useParams<{token: string}>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const dispatch = useDispatch()

  const formik = useFormik<IUpdatePassword>({
    initialValues: {
      ...passwordUpdateData,
    },
    validationSchema: passwordFormValidationSchema,
    onSubmit: async (values) => {
      setLoading(true)

      if (token) {
        await activateAccount(token, values.newPassword)
          .then((data) => {
            const {access} = data.data
            setPasswordUpdateData(values)
            setLoading(false)
            Swal.fire({
              theme: 'dark',
              title: `
                  <div className="fs-9">Thanks for resetting your password!.</div>
                  `,
              html: `
                  <div className="fs-8">Updates have been made. Let´s continue to memership details and confirmation.</div>
                  `,
              icon: 'success',
              iconColor: '#808b96',
              showConfirmButton: false,
              timer: 1000,
              allowOutsideClick: false,
            })
            dispatch(auth.actions.login(access))
          })
          .catch(() => {
            setLoading(false);
            Swal.fire({
              theme: 'dark',
              title: `
                      <div className="fs-9">An error has occurred.</div>
                      `,
              icon: 'error',
              showConfirmButton: false,
              timer: 1000,
              allowOutsideClick: false,
            })
          })
      }
    },
  })

  return (
    <>
      <form
        className='form w-100'
        noValidate
        id='kt_login_password_reset_form'
        onSubmit={formik.handleSubmit}
      >
        <div className='text-center mb-10'>
          {/* begin::Title */}
          <h1 className='text-white mb-3'>Welcome to Nobilis, Titas!</h1>
          {/* end::Title */}

          {/* begin::Link */}
          <div className='text-gray-400 fw-bold fs-8'>
            We are honored to have join us as a Founding Member during this exciting pre-launch
            phase.To begin, please reset your password.
          </div>
          {/* end::Link */}
        </div>

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <label
            htmlFor='newpassword'
            className='form-label fs-6 fw-bolder mb-3 text-gray-400 required'
          >
            NEW PASSWORD
          </label>
          <input
            autoComplete='off'
            type='password'
            className='form-control form-control-lg form-control-solid bg-dark text-white '
            id='newpassword'
            {...formik.getFieldProps('newPassword')}
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block text-white fs-8'>{formik.errors.newPassword}</div>
            </div>
          )}
        </div>
        <div className='fv-row mb-10'>
          <label
            htmlFor='confirmpassword'
            className='form-label fs-6 mb-3 text-gray-400 required'
          >
            CONFIRM PASSWORD
          </label>
          <input
            type='password'
            autoComplete='off'
            className='form-control form-control-lg form-control-solid bg-dark text-white'
            id='confirmpassword'
            {...formik.getFieldProps('passwordConfirmation')}
          />
          {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block text-white fs-8'>
                {formik.errors.passwordConfirmation}
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-10'>
          <div className='form-check form-check-custom form-check-solid'>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              id='flexCheckDefault'
              onChange={(e) => {
                setAccepted(e.target.checked)
              }}
            />
            <label className='form-check-label text-white'>
              I agree to the{' '}
              <a
                className='font-weight-bold cursor-pointer'
                onClick={() => {
                  setOpenModal(true)
                }}
              >
                Founding Member Terms and Conditions.
              </a>
            </label>
          </div>
        </div>

        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='text-center'>          
          <button
            type='submit'
            id='kt_password_reset_submit'
            className='btn btn-lg btn-light border bg-dark w-100 mb-5'
            disabled={!accepted}
          >
            {!loading && <span className='indicator-label'>CHANGE PASSWORD</span>}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
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
