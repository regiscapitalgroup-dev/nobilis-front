import {FC, useRef, ReactNode} from 'react'
import {LandingWrapper} from './LandingWrapper'
import {LandingFooter} from './components/LandingFooter'
import {ContactForm} from './components/LandingContactForm'

interface LandingLegalWrapperProps {
  children: ReactNode
}

const LandingLegalWrapper: FC<LandingLegalWrapperProps> = ({children}) => {
  const footerRef = useRef<HTMLDivElement>(null)

  return (
    <LandingWrapper footerRef={footerRef}>
      <div className='landing-legal-page'>{children}</div>

      <div ref={footerRef}>
        <LandingFooter>
          <ContactForm />
        </LandingFooter>
      </div>
    </LandingWrapper>
  )
}

export {LandingLegalWrapper}
