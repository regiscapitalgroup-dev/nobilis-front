import {FC} from 'react'
import ProfileAdminForm from './components/ProfileAdminForm'
import ProfileAdminConfidentialForm from './components/ProfileAdminConfidentialForm'
import ProfileAdminProfesionalForm from './components/ProfileAdminProfesionalForm'
import ProfileAdminPersonalForm from './components/ProfileAdminPersonalForm'

const ProfileAdminPage: FC = () => {
  return (
    <div>
      {/* <ProfileAdminForm /> */}
      <ProfileAdminConfidentialForm />
      {/* <ProfileAdminProfesionalForm /> */}
      {/* <ProfileAdminPersonalForm /> */}
    </div>
  )
}

export {ProfileAdminPage}
