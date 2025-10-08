import {FC} from 'react'
import ProfileAdminForm from './components/ProfileAdminForm'
import ProfileAdminConfidentialForm from './components/ProfileAdminConfidentialForm'
import ProfileAdminProfesionalForm from './components/ProfileAdminProfesionalForm'
import ProfileAdminPersonalForm from './components/ProfileAdminPersonalForm'
import {useParams} from 'react-router-dom'

type RouteParams = {
  section?: string
}

const ProfileAdminPage: FC = () => {
  const {section} = useParams<RouteParams>()

  const renderSection = () => {
    switch (section) {
      case 'profile':
        return <ProfileAdminForm />
      case 'confidential':
        return <ProfileAdminConfidentialForm />
      case 'professional':
        return <ProfileAdminProfesionalForm />
      case 'personal':
        return <ProfileAdminPersonalForm />
      default:
        return <div>Section not found</div>
    }
  }

  return <div>{renderSection()}</div>
}

export {ProfileAdminPage}
