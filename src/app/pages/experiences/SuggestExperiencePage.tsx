import {FC} from 'react'
import SuggestExperienceForm from './components/forms/SuggestExperienceForm'

const SuggestExperiencePage: FC = () => {
  return (
    <div className='suggest-experience-page'>
      <div className='suggest-experience-page__container'>
        <SuggestExperienceForm/>
      </div>
    </div>
  )
}

export default SuggestExperiencePage
