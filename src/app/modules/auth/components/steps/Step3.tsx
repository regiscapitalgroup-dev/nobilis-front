import {FC} from 'react'
import {ErrorMessage, Field} from 'formik'
import {FooterTitle, HeaderText, HeaderTitle} from '../helper/header-text'
import questions from '../helper/json-data/section2.json'

const Step3: FC = () => {
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        {/* begin::Heading */}
        <div className='mb-10 text-center'>
          <HeaderText />
        </div>
        {/* end::Heading */}

        <HeaderTitle
          text={'Please select the category that best represents your accomplishments*'}
        />
        <div className='text-white fs-7 mb-3'>(Select all that apply)</div>

        <div className='text-white fw-bold fs-8 '>
          Achievements are considered either current or past, provided past ones lasted at least 5
          years
        </div>
      </div>
      <div className='mb-0 fv-row'>
        <div className='mb-0'>
          {questions.map((question) => {
            return (
              <label className='d-flex flex-stack mb-5 cursor-pointer p-3 border' key={question.code}>
                <span className='d-flex align-items-center me-2'>
                  <span className='form-check form-check-custom form-check-solid form-check-sm'>
                    <Field
                      className='form-check-input '
                      type='checkbox'
                      name={question.code}
                    />
                  </span>

                  <span className='d-flex flex-column ms-3'>
                    <span className='fs-7 fw-bold text-gray-400'>
                      <strong className='text-white fw-bold'> {question.title} </strong>
                      {question.descrption}
                    </span>
                  </span>
                </span>
              </label>
            )
          })}

          <div className='row mb-7'>
            <label className='form-label text-muted fs-7'>
              IF APPLICABLE, PLEASE PROVIDE A DIRECT LINT TO VERIFIABLE SOURCE CONFIRMING YOUR
              QUALIFICATIONS (E.g. LINKDIN, FORTUNE 500, OFFICIAL AWARDS, OR OTHER REPUTABLE
              LISTINGS)
            </label>

            <div className='position-relative mb-3'>
              <Field
                type='text'
                className={'form-control form-control-lg form-control-solid bg-dark text-white'}
                name='linkVerify'
              />
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block text-white fs-8'>
                  <ErrorMessage name='linkVerify' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='text-center'>
          <FooterTitle text='Submitting this form adds you yo ourwaiting list, it does not guarantee membership' />
        </div>
      </div>
    </div>
  )
}

export {Step3}
