import {FC} from 'react'
import {Field} from 'formik'
import {HeaderText} from '../helper/header-text'
import questions from '../helper/json-data/section1.json'

type Step2Props = {
  goPrev: () => void
  goNext: () => void
}

const Step2: FC<Step2Props> = ({goPrev, goNext}) => {
  return (
    <div className='w-100 nb-step2'>
      <div className='mb-0 fv-row'>
        {/* BLOQUE 1 */}
        <div className='form-label nbq-title fs-7'>
          WHAT DRAWS YOU TO THE NOBILIS COMMUNITY MOST?
        </div>
        <div className='nbq-hint'>Select all that apply</div>

        {(questions?.[0]?.section01 ?? []).map((option) => (
          <label className='nbq-option mb-2' key={option.code}>
            <span className='nbq-check'>
              <Field className='form-check-input' type='checkbox' name={option.code} />
            </span>
            <span className='nbq-option__text nb-body'>{option.description}</span>
          </label>
        ))}

        <div className='mb-10' />

        {/* BLOQUE 2 */}
        <div className='form-label nbq-title fs-7'>
          HOW ARE YOU PLANNING TO PARTICIPATE IN NOBILIS?
        </div>
        <div className='nbq-hint'>Select all that apply</div>

        {(questions?.[1]?.section02 ?? []).map((option) => (
          <label className='nbq-option mb-2' key={option.code}>
            <span className='nbq-check'>
              <Field className='form-check-input' type='checkbox' name={option.code} />
            </span>
            <span className='nbq-option__text nb-body'>{option.description}</span>
          </label>
        ))}

        {/* OTHER */}
        <label className='nbq-option nbq-option--other mb-5'>
          <span className='nbq-check'>
            <Field className='form-check-input' type='checkbox' name='otherSelected' />
          </span>

          <div className='nbq-other nbq-grow'>
            <span className='nbq-option__text nb-body me-2'>Other</span>

            <div className='nbq-other-input-wrap nbq-grow'>
              <Field
                type='text'
                name='otherOption'
                className='form-control form-control-underline input-text-style nbq-other-input'
                placeholder=''
              />
            </div>
          </div>
        </label>

        {/* Nota + divider */}
        <div className='nb-note-wrap'>
          <p className='nb-note-figma'>
            Please complete the following confidential application to be considered.
            {'\n'}Submitting this form adds you to our waiting list; it does not guarantee
            membership.
          </p>

          <div className='nbx-lines' aria-hidden='true'>
            <span className='nbx-lines__line' />
            <span>
              <img src='/media/svg/nobilis/mark.svg' alt='divider' className='payment-card__icon' />
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
  )
}

export {Step2}
