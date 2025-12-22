import {FC, useState} from 'react'
import {useUserProfileContext} from '../../context/UserProfileContext'
import MemberVideosList from './components/MemberVideosList'
import {MemberBadges} from './components/MemberBadges'
import {MemberProfile} from './components/MemberProfile'
import {MemberLanguages} from './components/MemberLanguages'
import {MemberActions} from './components/MemberActions'
import {MemberImage} from './components/MemberImage'
import {MemberTabs} from './components/MemberTabs'

const MemberDetailPage: FC = () => {
  const [activeTab, setActiveTab] = useState('biography')
  const {data, loading} = useUserProfileContext()
  const {
    expertise = [],
    firstName,
    surname,
    bioPresentation,
    city,
    languages = [],
    profilePicture,
    picFooter,
    subscription,
    aliasTitle,
  } = data ?? {}

  return (
    <div className='member-detail'>
      <div className='member-detail__container'>
        <div className='member-detail__left'>
          <div className='member-detail__info-section'>
            <MemberBadges hasExpertise={expertise.length > 0} subscription={subscription} />
            <MemberProfile
              aliasTitle={aliasTitle ?? ''}
              firstName={firstName}
              surname={surname}
              bioPresentation={bioPresentation}
              city={city}
            />
          </div>
          <MemberLanguages languages={languages} />
          <MemberActions />
        </div>

        <MemberImage profilePicture={profilePicture} picFooter={picFooter} loading={loading} />
      </div>
      <MemberTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <MemberVideosList />
    </div>
  )
}

export {MemberDetailPage}
