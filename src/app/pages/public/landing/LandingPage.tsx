// LandingPage.tsx
import {FC, useRef} from 'react'
import {LandingWrapper} from './LandingWrapper'
import {LandingHero} from './components/LandingHero'
import {LandingIntro} from './components/LandingIntro'
import {LandingPress} from './components/LandingPress'
import {LandingTestimonial} from './components/LandingTestimonial'
import {LandingCTA} from './components/LandingCTA'
import {LandingPlatform} from './components/LandingPlatform'
import LandingValues from './components/LandingValues'
import {LandingMembers} from './components/Landingmembers'
import {LandingFooter} from './components/LandingFooter'
import {ContactForm} from './components/LandingContactForm'

const LandingPage: FC = () => {
  const footerRef = useRef<HTMLDivElement>(null)

  return (
    <LandingWrapper footerRef={footerRef}>
      <LandingHero imageUrl='/media/bg_lp_01.png' />
      <LandingIntro />
      <LandingMembers />
      <LandingValues />
      <LandingPlatform />
      <LandingCTA />
      <LandingTestimonial />
      {/* <LandingPress /> */}

      <div id='contact' ref={footerRef}>
        <LandingFooter>
          <ContactForm />
        </LandingFooter>
      </div>
    </LandingWrapper>
  )
}

export {LandingPage}
