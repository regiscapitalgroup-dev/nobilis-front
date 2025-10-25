import {FC, useState, useEffect} from 'react'
import {ExperienceModel} from './models/ExperienceModel'
import ExperienceTabs, {ExperienceTabType} from './components/ExperienceTabs'
import {getExperiences} from '../../services/experiencesService'
import RequestsTab from './components/tabs/RequestsTab'
import ActiveTab from './components/tabs/ActiveTab'
import PastTab from './components/tabs/PastTab'
import {useHistory} from 'react-router-dom'

const ExperiencesPage: FC = () => {
  const [experiences, setExperiences] = useState<ExperienceModel[]>([])
  const [activeTab, setActiveTab] = useState<ExperienceTabType>('requests')
  const navigate = useHistory()
  useEffect(() => {
    getExperiences().then(setExperiences)
  }, [])

  return (
    <div className='nb-experiences'>
      {/* Header */}
      <div className='nb-experiences__header'>
        <h1 className='nb-experiences__title'>My Experiences</h1>
        <div className='nb-experiences__actions'>
          <button className='nb-btn nb-btn--dark'>
            <span>HOST EXPERIENCE</span>
            <img
              src='/media/svg/nobilis/vector1.svg'
              alt=''
              className='nb-btn-icon nb-btn-icon--white'
            />
          </button>
          <button
            className='nb-btn nb-btn--outline'
            onClick={() => navigate.push('/experiences/create')}
          >
            <span>SUGGEST EXPERIENCE</span>
            <img
              src='/media/svg/nobilis/vector1.svg'
              alt=''
              className='nb-btn-icon nb-btn-icon--black'
            />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <ExperienceTabs activeTab={activeTab} onChange={setActiveTab} requestCount={2} />

      {/* Tab content */}
      {activeTab === 'requests' && <RequestsTab experiences={experiences} />}
      {activeTab === 'active' && <ActiveTab experiences={experiences} />}
      {activeTab === 'past' && <PastTab experiences={experiences} />}
    </div>
  )
}

export default ExperiencesPage
