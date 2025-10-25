import {FC} from 'react'
import {LandingWrapper} from '../../LandingWrapper'
import {PartnersHero} from './components/PartnersHero'
import {PartnersAccordion} from './components/PartnersAccordion'
import {LandingFooter} from '../../components/LandingFooter'
import {PartnershipForm} from './components/PartnershipForm'

const PartnersPage: FC = () => {
  return (
    <LandingWrapper>
      <PartnersHero />
      <PartnersAccordion />
      <LandingFooter>
        <PartnershipForm />
      </LandingFooter>
    </LandingWrapper>
  )
}

export {PartnersPage}
