import {KTSVG} from '../../../../_metronic/helpers'

interface ProfileMemberHeaderProps {
  firstName: string
  surname: string
  onClose: () => void
}

export function ProfileMemberHeader({firstName, surname, onClose}: ProfileMemberHeaderProps) {
  return (
    <div className='nb-pm-header'>
      <h1 className='nb-pm-header__title'>
        Profile Detail - {firstName} {surname}
      </h1>
      <button className='nb-pm-header__close-btn' onClick={onClose}>
        <KTSVG
          path='/media/svg/nobilis/waitlist/waitlist_nb_btn_icon_close_drawer.svg'
          className='rm-style-4'
        />
      </button>
    </div>
  )
}
