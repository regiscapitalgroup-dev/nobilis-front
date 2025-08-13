import {FC} from 'react'
import {Field} from 'formik'
import {HeaderText} from '../helper/header-text'
import questions from '../helper/json-data/section1.json'

type Step3Props = {
  goPrev: () => void
  goNext: () => void
}

const Step3: FC<Step3Props> = ({goPrev, goNext}) => {
  const items = (questions?.[2]?.section03 ?? []) as {
    code: string
    title?: string
    description?: string
  }[]

  return (
    <div className='nb-step3'>
      <div className='nbq-wrap'>
        <div className='mb-10 text-center'>
          <HeaderText
            title='Select the category that best represents your accomplishments'
            subtitle='To be considered for membership, applicants must meet at least one of the following criteria. Each reflects a different form of exceptional achievement, leadership, or influence. Accomplishments may be current or past, provided past roles lasted at least 4 years.'
          />
        </div>

        <div className='mb-0 fv-row'>
          <div className='nbq-hint mb-2'>Select all that apply</div>

          {items.map((option) => (
            <label className='nbq-option mb-2' key={option.code}>
              <span className='nbq-check'>
                <Field className='form-check-input' type='checkbox' name={option.code} />
              </span>

              {/* título en negrita + descripción light (dos líneas) */}
              <span className='nbq-option__stack nbq-grow'>
                <span className='nbq-option__title'>
                  {option.title ?? option.description ?? ''}
                </span>
                {option.title && option.description && (
                  <span className='nbq-option__desc'>{option.description}</span>
                )}
              </span>
            </label>
          ))}

          {/* Campo con hint + underline como en el mock */}
          <div className='nb-proof mt-6'>
            <div className='nb-body'>
              If applicable, please provide a direct link to a verifiable source confirming your
              qualifications
            </div>

            <Field
              type='url'
              name='linkVerify'
              autoComplete='off'
              inputMode='url'
              className='form-control form-control-underline nb-proof__input w-100'
              placeholder='(e.g., LinkedIn, Fortune 500, official awards, or other reputable listings)'
            />
          </div>

          {/* Texto + divisor con fleur (mismo de Step 2) */}
          <div className='text-center'>
            <div className='nb-body mt-8 mb-2'>
              Please complete the following confidential application to be considered.
              <br />
              Submitting this form adds you to our waiting list; it does not guarantee membership.
            </div>

            <div className='nb-divider my-6' aria-hidden='true'>
              <span className='nb-divider__line' />
              <span className='nb-divider__icon'>
                <svg className='nb-fleur' viewBox='0 0 24 25' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M12.4438 18.6367C12.5961 19.546 13.0832 21.5453 13.8139 22.2725C13.6629 22.7233 13.0918 23.8893 12.0131 24.9727V25C12.0086 24.9955 12.0039 24.9908 11.9994 24.9863C11.995 24.9907 11.9911 24.9956 11.9867 25V24.9727C10.9079 23.8892 10.3369 22.7233 10.1859 22.2725C10.9165 21.5452 11.4038 19.5459 11.5561 18.6367H12.4438ZM7.44571 17.7275C7.14127 18.3337 6.80678 19.6364 7.90274 20C8.99841 20.3633 9.57652 19.2428 9.72891 18.6367H10.643C10.4907 20.1519 9.63771 22.9091 7.44571 21.8184C5.25364 20.7275 6.5323 18.6367 7.44571 17.7275ZM16.5541 17.7275C17.4675 18.6368 18.7458 20.7275 16.5541 21.8184C14.3621 22.9092 13.5092 20.1519 13.3568 18.6367H14.2699C14.4223 19.2428 15.0011 20.3636 16.0971 20C17.1929 19.6364 16.8585 18.3337 16.5541 17.7275ZM14.7309 16.1826C15.2329 16.1826 15.64 16.5897 15.64 17.0918C15.6399 17.5938 15.2329 18.001 14.7309 18.001H9.2416C8.73975 18.0008 8.33252 17.5937 8.33243 17.0918C8.33243 16.5898 8.73969 16.1828 9.2416 16.1826H14.7309ZM0.13809 12.7285C1.24013 8.63713 9.72855 9.54643 11.099 15.4551H9.2709C8.66173 14.6974 6.89541 13.1826 4.70352 13.1826C1.96374 13.183 2.4208 16.8528 5.61758 15.9102C3.63881 16.8192 -0.840974 16.3638 0.13809 12.7285ZM12.8998 15.4551C14.2702 9.5463 22.7597 8.6371 23.8617 12.7285C24.8407 16.3637 20.361 16.8192 18.3822 15.9102C21.5791 16.8528 22.0355 13.1826 19.2953 13.1826C17.1037 13.1827 15.3382 14.6974 14.7289 15.4551H12.8998ZM12.0131 0.0449219C12.9367 1.58458 14.8221 5.11178 15.184 7.27246C15.6407 9.99973 14.2703 10.4547 13.3568 11.8184C12.6626 12.8549 12.1892 14.5207 12.0131 15.334V15.4541C12.0092 15.4348 12.0037 15.4151 11.9994 15.3945C11.9951 15.4151 11.9906 15.4349 11.9867 15.4541V15.3359C11.8109 14.5234 11.3377 12.8557 10.643 11.8184C9.72956 10.4547 8.35912 9.99973 8.81582 7.27246C9.17776 5.11171 11.0632 1.5845 11.9867 0.0449219V0Z' />
                </svg>
              </span>
              <span className='nb-divider__line' />
            </div>
          </div>

          {/* Back / Next iguales que Step 2 */}
          <div className='d-flex justify-content-between align-items-center pt-4'>
            <span
              data-kt-stepper-action='previous'
              className='nb-link-underline nb-link-underline--heading mt-4'
              role='button'
              tabIndex={0}
              onClick={goPrev}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && goPrev()}
            >
              BACK
            </span>
            <button type='button' className='btn nb-btn-outline' onClick={goNext}>
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Step3}
