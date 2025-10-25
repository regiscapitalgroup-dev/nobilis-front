// src/app/components/modals/DeclineModal.tsx
import React, {useState, useRef, useEffect} from 'react'
import {Modal} from 'react-bootstrap-v5'
import {useReasonField} from '../../../hooks/components/useReasons'

interface DeclineModalProps {
  show: boolean
  onHide: () => void
  onDecline: (reason: string, note: string) => void
}

export const DeclineModal: React.FC<DeclineModalProps> = ({show, onHide, onDecline}) => {
  const [reason, setReason] = useState('')
  const [note, setNote] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const {collection} = useReasonField()
  const [loading, setLoading] = useState(false)

  const handleDecline = async () => {
    setLoading(true)
    try {
      await onDecline(reason, note)
      setReason('')
      setNote('')
    } catch (error) {
      console.error('Error declining:', error)
    } finally {
      setLoading(false)
    }
  }

  const selectedReason = collection.find((r) => r.id.toString() === reason)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCancel = () => {
    setReason('')
    setNote('')
    setIsDropdownOpen(false)
    onHide()
  }

  const handleSelectReason = (id: number) => {
    setReason(id.toString())
    setIsDropdownOpen(false)
  }

  return (
    <Modal
      show={show}
      onHide={handleCancel}
      centered
      backdrop='static'
      dialogClassName='decline-modal'
      contentClassName='decline-modal-content'
      backdropClassName='decline-modal-backdrop'
    >
      <div className='decline-modal-body'>
        <div className='decline-modal-title'>Decline Membership Request</div>

        <div className='decline-modal-description'>
          Are you sure you want to decline this membership request?
          <br />
          The user will receive a notification email about the decision.
        </div>

        <div className='decline-modal-form'>
          {/* Select Reason */}
          <div className='decline-modal-field'>
            <label className='decline-modal-label'>DECLINE REASON</label>
            <div className='decline-modal-select-container' ref={dropdownRef}>
              <div
                className='decline-modal-select-header'
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className='decline-modal-select-value'>
                  {selectedReason ? selectedReason.reason : ''}
                </div>
                <div className={`decline-modal-select-arrow ${isDropdownOpen ? 'open' : ''}`}>
                  <svg width='18' height='18' viewBox='0 0 18 18' fill='none'>
                    <path
                      d='M5 7L9 11L13 7'
                      stroke='#151515'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
              </div>

              {isDropdownOpen && (
                <div className='decline-modal-select-dropdown'>
                  {collection.map((item) => (
                    <div
                      key={item.id}
                      className={`decline-modal-select-option ${
                        reason === item.id.toString() ? 'selected' : ''
                      }`}
                      onClick={() => handleSelectReason(item.id)}
                    >
                      {item.reason}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Textarea Note */}
          <div className='decline-modal-field'>
            <label className='decline-modal-label'>NOTE</label>
            <div className='decline-modal-textarea-container'>
              <textarea
                className='decline-modal-textarea'
                placeholder=''
                maxLength={100}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={1}
              />
              <div className='decline-modal-textarea-footer'>
                <div className='decline-modal-textarea-hint'>Lorem ipsum</div>
                <div className='decline-modal-textarea-counter'>{note.length}/100</div>
              </div>
            </div>
          </div>
        </div>

        <div className='decline-modal-actions'>
          <div className='decline-modal-btn-cancel' onClick={handleCancel}>
            <div className='decline-modal-btn-text'>cancel</div>
          </div>
          <div className='decline-modal-btn-decline' onClick={handleDecline}>
            {!loading ? (
              <>
                <div className='decline-modal-btn-text'>decline</div>
                <img
                  src='/media/svg/nobilis/vector1.svg'
                  alt=''
                  className='nb-btn-icon nb-btn-icon--white'
                />
              </>
            ) : (
              <div className='decline-modal-btn-text'>
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