import {Link} from 'react-router-dom'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../../../setup'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'

export default function PaymentExpertSuccessPage() {
  const {user} = useSelector((state: RootState) => state.auth, shallowEqual)
  const firstName = user?.firstName || 'User'

  return (
    <div className="paym-success-wrapper">
      <div className="paym-success">
        <div className="paym-success__card">
          <h2 className="paym-success__title">
            Thank You, {firstName}! <br /> We have received your introduction request.
          </h2>

          <p className="paym-success__desc">
            You can expect a response as soon as possible, and no later than 45 days. You may check
            the status of your request at any time in your
            <span className="paym-success__desc-highlight"> "My Introductions" </span>
            settings. Once approved, you will be able to communicate directly with the member via
            messenger to arrange a meeting or discuss your topic of interest.
          </p>

          <div className="paym-success__note">Lorem</div>

          <div className="paym-success__divider">
            <span className="paym-success__line" />
            <img src="/media/svg/nobilis/mark.svg" alt="divider" className="paym-success__icon" />
            <span className="paym-success__line" />
          </div>

          <a href="/members" className="paym-success__btn">
            <span className="paym-success__btn-text">Discover other member</span>
            <img src="/media/svg/nobilis/vector1.svg" alt="arrow" className="paym-success__btn-icon" />
          </a>
        </div>
      </div>

      {/* Imagen full width */}
      <div className="paym-success-image">
        <img src="/media/login-room.png" alt="room" />
      </div>
    </div>
  )
}