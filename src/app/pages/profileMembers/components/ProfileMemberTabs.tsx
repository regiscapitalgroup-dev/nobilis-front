import {FC} from 'react'
import clsx from 'clsx'

interface ProfileMemberTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export const ProfileMemberTabs: FC<ProfileMemberTabsProps> = ({activeTab, onTabChange}) => {
  const tabs = [
    {id: 'general', label: 'General Profile'},
    {id: 'team', label: 'My Team'},
    {id: 'experiences', label: 'My Experiences'},
    {id: 'introductions', label: 'My Introductions'},
    {id: 'expertise', label: 'My Expertise'},
    {id: 'community', label: 'Community'},
    {id: 'credits', label: 'Credits and Payments'},
    {id: 'support', label: 'Support Tickets'},
  ]

  return (
    <div className='nb-pm-tabs'>
      {tabs.map((tab, index) => (
        <>
          <div
            key={tab.id}
            className={clsx('nb-pm-tabs__item', activeTab === tab.id && 'nb-pm-tabs__item--active')}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </div>
          {index < tabs.length - 1 && (
            <svg
              width='1'
              height='20'
              viewBox='0 0 1 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M0.5 0V20' stroke='#B4B4B4' />
            </svg>
          )}
        </>
      ))}
    </div>
  )
}