import {FC} from 'react'
import {Field} from 'formik'
import {HeaderText, HeaderTitle} from '../helper/header-text'
import questions from '../helper/json-data/section1.json'
import {KTSVG} from '../../../../../_metronic/helpers'

const Step2: FC = () => {
  return (
    <div className='w-100'>
      <div className='pb-5 pb-lg-5'>
        {/* begin::Heading */}
        <div className='mb-5 text-center'>
          <HeaderText />
          <HeaderTitle
            text={'What primarily motivates your interest in joining the Nobilis community?'}
          />
        </div>
        {/* end::Heading */}
      </div>
      <div className='mb-0 fv-row'>
        <div className='mb-0'>
          {questions.map((question) => {
            return (
              <label
                className='d-flex flex-stack mb-5 cursor-pointer p-3 border'
                key={question.code}
              >
                <span className='d-flex align-items-center me-2'>
                  <span className='form-check form-check-custom form-check-solid form-check-sm'>
                    <Field className='form-check-input' type='checkbox' name={question.code} />
                  </span>

                  <span className='d-flex flex-column ms-3'>
                    <span className='fs-7 fw-bold text-gray-400'>{question.descrption}</span>
                  </span>
                </span>
              </label>
            )
          })}

          <div className='row'>
            <label className='form-label text-muted fs-7'>OTHER (PLEASE SPECIFY)</label>

            <div className='position-relative mb-3'>
              <Field
                type='text'
                className={'form-control form-control-lg form-control-solid bg-dark text-white'}
                name='otherOption'
              />
            </div>
          </div>

          <div className='text-center pt-15'>
            <div>
              <button type='submit' className='btn btn-lg btn-light border bg-dark me-3'>
                <span className='indicator-label'>Continue</span>
                <KTSVG
                  path='/media/icons/duotune/arrows/arr064.svg'
                  className='svg-icon-3 ms-2 me-0'
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Step2}
