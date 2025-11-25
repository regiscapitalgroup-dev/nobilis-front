import React, {useState, useRef, useEffect} from 'react'
import {Modal} from 'react-bootstrap-v5'
import {KTSVG} from '../../../../../_metronic/helpers'
import {LegalComponent} from '../../../../pages/legal/components/LegalComponent'
import {TermsData} from '../../../../pages/legal/data/TermsData'

type Props = {
  show: boolean
  handleClose: () => void
}

const TermsConditionsModal: React.FC<Props> = ({show, handleClose}) => {
  const scrollToTop = () => {
    const modalBody = document.querySelector('.modal-body')
    modalBody?.scrollTo({top: 0, behavior: 'smooth'})
  }
  return (
    <>
      <Modal
        id='kt_modal_create_app'
        tabIndex={-1}
        aria-hidden='true'
        dialogClassName='modal-dialog-centered h-auto'
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
            <LegalComponent title={TermsData.title} sections={TermsData.sections} />
          </div>
          <div
            className='scrolltop bg-dark'
            onClick={scrollToTop}
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              cursor: 'pointer',
              zIndex: 9999,
            }}
          >
            <KTSVG path='/media/icons/duotune/arrows/arr066.svg' />
          </div>
        </div>
      </Modal>
    </>
  )
}

export {TermsConditionsModal}
