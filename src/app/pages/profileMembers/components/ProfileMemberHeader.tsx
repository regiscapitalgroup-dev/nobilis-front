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
        <svg
          width='28'
          height='28'
          viewBox='0 0 28 28'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M13.8333 27.1667C21.1667 27.1667 27.1667 21.1667 27.1667 13.8333C27.1667 6.5 21.1667 0.5 13.8333 0.5C6.5 0.5 0.5 6.5 0.5 13.8333C0.5 21.1667 6.5 27.1667 13.8333 27.1667Z'
            stroke='#B4B4B4'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      </button>
    </div>
  )
}
