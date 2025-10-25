import {FC} from 'react'
import {LandingWrapper} from '../../LandingWrapper'
import {LandingFooter} from '../../components/LandingFooter'
import {ContactForm} from '../../components/LandingContactForm'
import {ValuesHero} from './components/ValuesHero'
import {ValuesIntro} from './components/ValuesIntro'
import ValuesSecction from './components/ValuesSecction'
import {ValuesMission}  from './components/ValuesMission'
import { ValuesVideo } from './components/ValuesVideo'

const ValuesPage: FC = () => {
  return (
    <LandingWrapper>
      <ValuesHero />
      <ValuesIntro />
      <ValuesMission/>
      <ValuesSecction />
      <ValuesVideo/>
      <LandingFooter>
        <ContactForm />
      </LandingFooter>
    </LandingWrapper>
  )
}

export {ValuesPage}
