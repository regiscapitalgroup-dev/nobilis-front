import {FC} from 'react'
import {LandingLegalWrapper} from '../LandingLegalWrapper'
import {LegalComponent} from '../../../legal/components/LegalComponent'
import {TermsData} from '../../../legal/data/TermsData'

const LandingTermsPage: FC = () => {
  return (
    <LandingLegalWrapper>
      <LegalComponent title={TermsData.title} sections={TermsData.sections} />
    </LandingLegalWrapper>
  )
}

export {LandingTermsPage}
