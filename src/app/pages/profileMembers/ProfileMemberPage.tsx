import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useUserProfileContext} from '../../context/UserProfileContext'
import {ProfileMemberHeader} from './components/ProfileMemberHeader'
import {ProfileMemberTabs} from './components/ProfileMemberTabs'
import {ProfileMemberMeta} from './components/ProfileMemberMeta'
import {ProfileMemberInfo} from './components/ProfileMemberInfo'
import {ProfileMemberImage} from './components/ProfileMemberImage'
import {ProfileMemberTabsSection} from './components/ProfileMemberTabsSection'

export function ProfileMemberPage() {
  const history = useHistory()
  const [activeTab, setActiveTab] = useState('general')
  const {data, loading, setSearchParams} = useUserProfileContext()

  const {
    firstName,
    surname,
    aliasTitle,
    bioPresentation,
    city,
    languages = [],
    profilePicture,
    picFooter,
    subscription,
    expertise = [],
    introduction = [],
    socialMediaProfiles = [],
    assignedManager,
  } = data ?? {}

  useEffect(() => {
    return () => {
      const nextPath = history.location.pathname
      const keepUserRoutes = [
        '/biography/overview',
        '/profile-member',
        '/admin/overview/professional',
        '/admin/overview/personal',
        '/admin/overview/confidential',
        '/admin/overview/profile',
        '/recognition',
        '/expertise',
      ]

      const shouldKeepUser = keepUserRoutes.some((route) => nextPath.includes(route))
      if (!shouldKeepUser) {
        setSearchParams({userSelected: ''})
      }
    }
  }, [setSearchParams, history])

  return (
    <div className='nb-pm-page'>
      <ProfileMemberHeader
        firstName={firstName ?? ''}
        surname={surname ?? ''}
        onClose={() => history.goBack()}
      />

      <ProfileMemberTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <ProfileMemberMeta
        assignedAdmin={`${assignedManager?.firstName ?? ''} ${assignedManager?.lastName ?? ''}`}
        plan=''
        newMemberGuide=''
        memberTier=''
        email=''
      />

      <div className='nb-pm-content'>
        <div className='nb-pm-content__left'>
          <ProfileMemberInfo
            user={'user'}
            expertise={expertise}
            firstName={firstName ?? ''}
            surname={surname ?? ''}
            aliasTitle={aliasTitle ?? ''}
            bioPresentation={bioPresentation ?? ''}
            city={city ?? ''}
            languages={languages}
            introduction={introduction}
            socialMediaProfiles={socialMediaProfiles}
            subscription={subscription}
          />
        </div>

        <ProfileMemberImage
          profilePicture={profilePicture ?? ''}
          picFooter={picFooter ?? ''}
          loading={loading}
        />
      </div>

      <ProfileMemberTabsSection />
    </div>
  )
}
