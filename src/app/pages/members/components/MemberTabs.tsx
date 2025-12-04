import {FC} from 'react'
import { BiographyTab } from '../../biography/components/tabs/BiographyTab'
import { ProfessionalOverviewTab } from '../../biography/components/tabs/ProfessionalOverviewTab'
import { LifestyleTab } from '../../biography/components/tabs/LifestyleTab'
import { RecognitionTab } from '../../biography/components/tabs/RecognitionTab'
import { ExpertiseTab } from '../../biography/components/tabs/ExpertiseTab'

interface MemberTabsProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}

const tabs = [
  {id: 'biography', label: 'Biography'},
  {id: 'professional', label: 'Professional Overview'},
  {id: 'lifestyle', label: 'Lifestyle'},
  {id: 'recognition', label: 'Recognition'},
  {id: 'expertise', label: 'Expertise'},
]

export const MemberTabs: FC<MemberTabsProps> = ({activeTab, onTabChange}) => {
  return (
    <div className='member-detail__tabs-section'>
      <div className='member-detail__tabs'>
        {tabs.map((tab, index) => (
          <>
            <div
              key={tab.id}
              className={`member-detail__tab ${
                activeTab === tab.id ? 'member-detail__tab--selected' : ''
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <div className='member-detail__tab-text'>{tab.label}</div>
            </div>
            {index < tabs.length - 1 && (
              <svg
                width='1'
                height='20'
                viewBox='0 0 1 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M0.5 0V20' stroke='#808080' />
              </svg>
            )}
          </>
        ))}
      </div>

      <div className='bio-tabs__content'>
        {activeTab === 'biography' && <BiographyTab />}
        {activeTab === 'professional' && <ProfessionalOverviewTab />}
        {activeTab === 'lifestyle' && <LifestyleTab />}
        {activeTab === 'recognition' && <RecognitionTab />}
        {activeTab === 'expertise' && <ExpertiseTab />}
      </div>
    </div>
  )
}