// src/app/components/modals/ApproveModal.tsx
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap-v5'

interface ApproveModalProps {
  show: boolean
  onHide: () => void
  onApprove: () => void
}

export const ApproveModal: React.FC<ApproveModalProps> = ({
  show,
  onHide,
  onApprove,
}) => {

  const [loading, setLoading] = useState(false)
  const handleApprove = async () => {
    setLoading(true)
    try {
      await onApprove()
    } catch (error) {
      console.error('Error approving:', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      dialogClassName="approve-modal"
      contentClassName="approve-modal-content"
      backdropClassName="approve-modal-backdrop"
    >
      <div className="approve-modal-body">
        <div className="approve-modal-title">Approve Membership Request</div>
        <div className="approve-modal-description">
          Are you sure you want to approve this user's membership request?
          <br />
          A unique invitation link will be generated and sent to the user's email so they can continue the registration process.
        </div>
        <div className="approve-modal-actions">
          <div className="approve-modal-btn-cancel" onClick={onHide}>
            <div className="approve-modal-btn-text">cancel</div>
          </div>
          <div className="approve-modal-btn-approve" onClick={handleApprove}>
            {!loading ? (
              <>
                <div className="approve-modal-btn-text">Approve</div>
                <img
                  src='/media/svg/nobilis/vector1.svg'
                  alt=''
                  className='nb-btn-icon nb-btn-icon--white'
                />
              </>
            ) : (
              <div className="approve-modal-btn-text">
                Please wait...
                <span
                  className='spinner-border spinner-border-sm align-middle ms-2'
                  role='status'
                  aria-hidden='true'
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}