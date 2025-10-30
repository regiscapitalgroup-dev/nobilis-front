import {FC} from 'react'
import { LandingLegalWrapper } from '../LandingLegalWrapper'
import { LegalComponent } from '../../../legal/components/LegalComponent'
import { PrivacyData } from '../../../legal/data/PrivacyData'

const LandingPrivacyPage: FC = () => {
  return (
    <LandingLegalWrapper>
      <LegalComponent title={PrivacyData.title} sections={PrivacyData.sections} />
    </LandingLegalWrapper>
  )
}

export {LandingPrivacyPage}