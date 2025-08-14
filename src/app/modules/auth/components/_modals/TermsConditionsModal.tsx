import React from 'react'
import {Modal} from 'react-bootstrap-v5'
import {KTSVG} from '../../../../../_metronic/helpers'
import {HeaderText} from '../helper/header-text'

type Props = {
  show: boolean
  handleClose: () => void
}

const TermsConditionsModal: React.FC<Props> = ({show, handleClose}) => {
  return (
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog-centered mw-600px h-auto'
      show={show}
      onHide={handleClose}
    >
      <div className='container-xxl px-10 py-10 text-center border'>
        <div className='modal-header py-2 d-flex justify-content-end border-0'>
          {/* begin::Close */}
          <div className='btn btn-icon btn-sm btn-light' onClick={handleClose}>
            <KTSVG className='svg-icon-2' path='/media/icons/duotune/arrows/arr061.svg' />
          </div>
          {/* end::Close */}
        </div>

        <div className='modal-body'>
          {/*begin::Stepper */}
          <div className='d-flex flex-column flex-xl-row flex-row-fluid'>
            {/*begin::Aside */}
            <div className='d-flex justify-content-center  flex-row-auto w-100'>
              {/*begin::Nav */}
              <div className='pb-5 current' data-kt-stepper-element='content'>
                <div className='w-100'>
                  {/*begin::Heading */}
                  <HeaderText
                    title='Coming soon '
                    subtitle='Terms and conditions'
                  />
                  {/*begin::Heading */}

                  {/*begin::Form Group */}
                  <div className='fv-row'>
                    {/*begin:Option */}
                    {/* <label className='d-flex align-items-center justify-content-between mb-6 cursor-pointer'>
                      <span className='d-flex align-items-center me-2'>
                        <span className='symbol symbol-50px me-6'>
                          <span className='symbol-label bg-light-primary'>
                            <KTSVG
                              path='/media/icons/duotune/maps/map004.svg'
                              className='svg-icon-1 svg-icon-primary'
                            />
                          </span>
                        </span>

                        <span className='d-flex flex-column'>
                          <span className='fw-bolder fs-6'>Quick Online Courses</span>
                          <span className='fs-7 text-muted'>
                            Creating a clear text structure is just one SEO
                          </span>
                        </span>
                      </span>
                    </label> */}
                    {/*end::Option */}

                    {/*begin:Option */}
                    {/* <label className='d-flex align-items-center justify-content-between mb-6 cursor-pointer'>
                      <span className='d-flex align-items-center me-2'>
                        <span className='symbol symbol-50px me-6'>
                          <span className='symbol-label bg-light-danger'>
                            <KTSVG
                              path='/media/icons/duotune/general/gen024.svg'
                              className='svg-icon-1 svg-icon-danger'
                            />
                          </span>
                        </span>

                        <span className='d-flex flex-column'>
                          <span className='fw-bolder fs-6'>Face to Face Discussions</span>
                          <span className='fs-7 text-muted'>
                            Creating a clear text structure is just one aspect
                          </span>
                        </span>
                      </span>

                      <span className='form-check form-check-custom form-check-solid'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='appType'
                          value='Face to Face Discussions'
                        />
                      </span>
                    </label> */}
                    {/*end::Option */}

                    {/*begin:Option */}
                    {/* <label className='d-flex align-items-center justify-content-between mb-6 cursor-pointer'>
                      <span className='d-flex align-items-center me-2'>
                        <span className='symbol symbol-50px me-6'>
                          <span className='symbol-label bg-light-success'>
                            <KTSVG
                              path='/media/icons/duotune/general/gen013.svg'
                              className='svg-icon-1 svg-icon-success'
                            />
                          </span>
                        </span>

                        <span className='d-flex flex-column'>
                          <span className='fw-bolder fs-6'>Full Intro Training</span>
                          <span className='fs-7 text-muted'>
                            Creating a clear text structure copywriting
                          </span>
                        </span>
                      </span>

                      <span className='form-check form-check-custom form-check-solid'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='appType'
                          value='Full Intro Training'
                        />
                      </span>
                    </label> */}
                    {/*end::Option */}
                  </div>
                  {/*end::Form Group */}
                </div>
              </div>
              {/*end::Nav */}
            </div>
          </div>
          {/* end::Stepper */}
        </div>
      </div>
    </Modal>
  )
}

export {TermsConditionsModal}
