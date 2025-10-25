import {FC} from 'react'
import {Field} from 'formik'
import questions from '../helper/json-data/section1.json'

type Step4Props = {goPrev: () => void; goNext: () => void; loading?: boolean}

const Step4: FC<Step4Props> = ({goPrev, goNext, loading}) => {
  const items = (questions?.[3]?.section04 ?? []) as {
    code: string
    title?: string
    description?: string
  }[]

  return (
    <div className='nb-step4'>
      <div className='nbq-wrap'>
        <div className='mb-0 fv-row'>
          {/* Título */}
          <div className='nb4-title'>select your current net worth (USD)</div>

          {/* Opciones */}
          <div className='nb4-options'>
            {items.map((opt) => (
              <label className='nb4-option' key={opt.code}>
                <span className='nb4-radio'>
                  <Field type='radio' name='income_range' value={opt.description} />
                </span>
                <span className='nb4-option__text'>{opt.description}</span>
              </label>
            ))}
          </div>

          {/* Nota */}
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
              onClick={goPrev}
              disabled={loading}
            >
              BACK
            </button>

            <button
              type='button'
              className='nbq-next'
              onClick={goNext}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span>Please wait...</span>
                  <span className='spinner-border spinner-border-sm ms-2'></span>
                </>
              ) : (
                <>
                  <span>Submit</span>
                  <img
                    src='/media/svg/nobilis/vector1.svg'
                    alt=''
                    className='nb-btn-icon nb-btn-icon--black'
                  />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Step4}