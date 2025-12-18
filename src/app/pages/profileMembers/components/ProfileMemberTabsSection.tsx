import {FC, useState} from 'react'
import {ProfessionalOverviewTab} from '../../biography/components/tabs/ProfessionalOverviewTab'
import {LifestyleTab} from '../../biography/components/tabs/LifestyleTab'
import {RecognitionTab} from '../../biography/components/tabs/RecognitionTab'
import {ExpertiseTab} from '../../biography/components/tabs/ExpertiseTab'
import {ProfileMemberInfoAdmin} from './ProfileMemberInfoAdmin'
import {ProfileMemberInfoFamily} from './ProfileMemberInfoFamily'
import {Link, useHistory} from 'react-router-dom'
import {KTSVG} from '../../../../_metronic/helpers'
import {BiographyTab} from '../../biography/components/tabs/BiographyTab'

interface ProfileMemberTabsSectionProps {}

export const ProfileMemberTabsSection: FC<ProfileMemberTabsSectionProps> = () => {
  const [activeTab, setActiveTab] = useState('general')
  const navigate = useHistory()

  const tabs = [
    {id: 'biography', label: 'Biography'},
    {id: 'professional', label: 'Professional Overview'},
    {id: 'lifestyle', label: 'Lifestyle'},
    {id: 'recognition', label: 'Recognition'},
    {id: 'expertise', label: 'Expertise'},
  ]

  return (
    <div className='nb-pm-tabs-section'>
      <div className='nb-pm-tabs-header'>
        <div className='nb-pm-tabs-row'>
          <div className='nb-pm-tabs-list'>
            {tabs.map((tab, index) => (
              <>
                <div
                  key={tab.id}
                  className={`nb-pm-tabs-item ${
                    activeTab === tab.id ? 'nb-pm-tabs-item--active' : ''
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <div className='nb-pm-tabs-item-text'>{tab.label}</div>
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

          <div className='nb-pm-confidential-btn'>
            <Link className='nb-pm-confidential-btn-text' to={'/admin/overview/confidential'}>
              Confidential Info
            </Link>
          </div>
        </div>
        {activeTab !== 'general' && (
          <div className='nb-pm-edit-row'>
            <button
              className='nb-pm-edit-btn'
              onClick={() => {
                const routes: Record<string, string> = {
                  biography: '/biography/overview',
                  professional: '/admin/overview/professional',
                  lifestyle: '/admin/overview/personal',
                  recognition: '/recognition',
                  expertise: '/expertise',
                }

                const route = routes[activeTab] || '/profile-member'
                navigate.push(route)
              }}
            >
              <span className='nb-pm-edit-btn-text'>EDIT</span>
              <KTSVG path='/media/svg/nobilis/vector1.svg' className='nb-pm-edit-btn-icon' />
            </button>
          </div>
        )}
      </div>

      {/* Contenido de cada tab */}
      <div className='nb-pm-tabs-content'>
        {activeTab === 'biography' && <BiographyTab />}
        {activeTab === 'professional' && <ProfessionalOverviewTab />}
        {activeTab === 'lifestyle' && <LifestyleTab />}
        {activeTab === 'recognition' && <RecognitionTab />}
        {activeTab === 'expertise' && <ExpertiseTab />}
        {activeTab === 'general' && (
          <div className='nb-pm-tabs-panel--two-col'>
            <ProfileMemberInfoAdmin />
            <ProfileMemberInfoFamily />
          </div>
        )}
      </div>
    </div>
  )
}
