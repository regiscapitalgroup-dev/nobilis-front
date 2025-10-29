import {FC, useRef} from 'react'
import {LandingWrapper} from '../../LandingWrapper'
import {PartnersHero} from './components/PartnersHero'
import {PartnersAccordion} from './components/PartnersAccordion'
import {LandingFooter} from '../../components/LandingFooter'
import {PartnershipForm} from './components/PartnershipForm'

const PartnersPage: FC = () => {
  const footerRef = useRef<HTMLDivElement>(null)

  return (
    <LandingWrapper footerRef={footerRef}>
      <PartnersHero />
      <PartnersAccordion />
      <div id='partner' ref={footerRef}>
        <LandingFooter>
          <PartnershipForm />
        </LandingFooter>
      </div>
    </LandingWrapper>
  )
}

export {PartnersPage}
