import {FC, useRef} from 'react'
import {LandingWrapper} from '../../LandingWrapper'
import {LandingFooter} from '../../components/LandingFooter'
import {ContactForm} from '../../components/LandingContactForm'
import {ValuesHero} from './components/ValuesHero'
import {ValuesIntro} from './components/ValuesIntro'
import ValuesSecction from './components/ValuesSecction'
import {ValuesMission} from './components/ValuesMission'
import {ValuesVideo} from './components/ValuesVideo'

const ValuesPage: FC = () => {
  const contactRef = useRef<HTMLDivElement>(null)

  return (
    <LandingWrapper contactRef={contactRef}>
      <ValuesHero />
      <ValuesIntro />
      <ValuesMission />
      <ValuesSecction />
      <ValuesVideo />
      <div id='contact' ref={contactRef}>
        <LandingFooter>
          <ContactForm />
        </LandingFooter>
      </div>
    </LandingWrapper>
  )
}

export {ValuesPage}
