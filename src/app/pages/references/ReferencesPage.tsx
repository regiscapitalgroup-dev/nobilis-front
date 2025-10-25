import {FC} from 'react'
import ReferencesCard from './components/ReferencesCard'
import ReferencesForm from './components/ReferencesForm'

const ReferencesPage: FC = () => {
  return (
    <div className='references-page'>
      <div className='references-page__container'>
        <ReferencesForm />

        <div className='references-page__cards'>
          <ReferencesCard />
        </div>
      </div>
    </div>
  )
}

export {ReferencesPage}
