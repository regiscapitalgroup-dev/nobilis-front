import {FC} from 'react'
import { KTSVG } from '../../../../../_metronic/helpers'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const CancelExperienceModal: FC<Props> = ({isOpen, onClose, onConfirm}) => {
  if (!isOpen) return null

  return (
    <div className='nb-modal-overlay' onClick={onClose}>
      <div className='nb-modal-container' onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className='nb-modal-header'>
          <h2 className='nb-modal-title'>Cancel This Experience?</h2>
        </div>

        {/* CONTENT */}
        <div className='nb-modal-content'>
          {/* Policy Item 1 */}
          <div className='nb-modal-policy'>
            <div className='nb-modal-policy__label'>
              <div className='nb-modal-policy__label-title'>Within</div>
              <div className='nb-modal-policy__label-subtitle'>48 hours of booking</div>
            </div>
            <div className='nb-modal-policy__description'>
              <div className='nb-modal-policy__description-title'>Full refund</div>
              <div className='nb-modal-policy__description-text'>
                You'll get back 100% of what you paid—no cancellation fee.
              </div>
            </div>
          </div>

          {/* Policy Item 2 */}
          <div className='nb-modal-policy'>
            <div className='nb-modal-policy__label'>
              <div className='nb-modal-policy__label-title'>Before</div>
              <div className='nb-modal-policy__label-subtitle'>Aug 7, 2:00 PM</div>
            </div>
            <div className='nb-modal-policy__description'>
              <div className='nb-modal-policy__description-title'>Partial refund</div>
              <div className='nb-modal-policy__description-text'>
                You'll receive an 80% refund. A 20% cancellation fee applies for preparation
                costs.
              </div>
            </div>
          </div>

          {/* Policy Item 3 */}
          <div className='nb-modal-policy'>
            <div className='nb-modal-policy__label'>
              <div className='nb-modal-policy__label-title'>After</div>
              <div className='nb-modal-policy__label-subtitle'>Aug 7, 2:00 PM</div>
            </div>
            <div className='nb-modal-policy__description'>
              <div className='nb-modal-policy__description-title'>Partial refund</div>
              <div className='nb-modal-policy__description-text'>
                You'll receive a 50% refund. The remaining 50% is non-refundable due to last-minute
                cancellation.
              </div>
            </div>
          </div>

          {/* Policy Item 4 */}
          <div className='nb-modal-policy'>
            <div className='nb-modal-policy__label'>
              <div className='nb-modal-policy__label-title'>After</div>
              <div className='nb-modal-policy__label-subtitle'>Aug 27, 2:00 PM</div>
            </div>
            <div className='nb-modal-policy__description'>
              <div className='nb-modal-policy__description-title'>No refund</div>
              <div className='nb-modal-policy__description-text'>
                Cancellations made less than 24 hours before the experience start time are not
                eligible for a refund.
              </div>
            </div>
          </div>

          {/* Refund Eligibility Section */}
          <div className='nb-modal-eligibility'>
            <div className='nb-modal-eligibility__label'>Refund Eligibility</div>
            <div className='nb-modal-eligibility__text'>
              If you paid using credits or made a partial payment, your refund will depend on how
              much you've paid at the time of cancellation. Credits refunded follow the same
              percentage rules and are returned to your account wallet.
            </div>
            <div className='nb-modal-eligibility__warning'>
              <div className='nb-modal-eligibility__warning-text'>
                This action cannot be undone.
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className='nb-modal-actions'>
            <button className='nb-modal-btn nb-modal-btn--outline' onClick={onClose}>
              <span>Keep Experience Active</span>
            </button>
            <button className='nb-modal-btn nb-modal-btn--dark' onClick={onConfirm}>
              <span>Cancel Anyway</span>
              <KTSVG path='/media/svg/nobilis/vector1.svg' className='nb-btn-icon--white' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CancelExperienceModal