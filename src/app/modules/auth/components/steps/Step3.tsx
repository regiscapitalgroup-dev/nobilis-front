import {FC} from 'react'
import {Field, FieldProps} from 'formik'
import questions from '../helper/json-data/section1.json'

type Step3Props = {goPrev: () => void; goNext: () => void}

const Step3: FC<Step3Props> = ({goPrev, goNext}) => {
  const items = (questions?.[2]?.section03 ?? []) as {
    code: string
    title?: string
    description?: string
  }[]

  return (
    <div className='nb-step3'>
      <div className='nbq-wrap nb3-scope'>
        {/* <- scope visual Step3 */}
        <div className='mb-0 fv-row'>
          <div className='nb3-hint'>Select all that apply</div>

          {/* === Opciones === */}
          {items.map((opt) => (
  <label className='nbq-option mb-2' key={opt.code}>
    <span className='nbq-check'>
      <Field className='form-check-input' type='checkbox' name={opt.code} />
    </span>
    <span className='nbq-option__text nb-body'>
      {opt.title ? (
        <>
          {opt.title}
          {opt.description && <><br /><small>{opt.description}</small></>}
        </>
      ) : (
        opt.description
      )}
    </span>
  </label>
))}

          {/* Hint + input con underline */}
          <div className='nb-proof mt-6 mb-15'>
            <div className='nb3-proof-text'>
              If applicable, please provide a direct link to a verifiable source confirming your
              qualifications
            </div>

            <Field
              type='url'
              name='linkVerify'
              autoComplete='off'
              inputMode='url'
              className='form-control nb3-proof-input'
              placeholder='(e.g., LinkedIn, Fortune 500, official awards, or other reputable listings)'
            />
          </div>

          {/* Nota + divisor (igual Step2) */}
          <div className='nb-note-wrap'>
            <p className='nb-note-figma'>
              Please complete the following confidential application to be considered.
              {'\n'}Submitting this form adds you to our waiting list; it does not guarantee
              membership.
            </p>
            <div className='nbx-lines' aria-hidden='true'>
              <span className='nbx-lines__line' />
              <span>
                <img
                  src='/media/svg/nobilis/mark.svg'
                  alt='divider'
                  className='payment-card__icon'
                />
              </span>
              <span className='nbx-lines__line' />
            </div>
          </div>

          {/* Acciones */}
          <div className='nbq-actions'>
            <button
              type='button'
              className='nbq-back'
              data-kt-stepper-action='previous'
              onClick={goPrev}
            >
              BACK
            </button>
            <button type='button' className='nbq-next' onClick={goNext}>
              <span>Next</span>
              <img
                src='/media/svg/nobilis/vector1.svg'
                alt=''
                className='nb-btn-icon nb-btn-icon--black'
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Step3}
