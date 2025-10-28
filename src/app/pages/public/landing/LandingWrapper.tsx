import {FC, RefObject, useState} from 'react'
import {LandingHeader} from './components/LandingHeader'
import {LandingMenu} from './components/Landingmenu'

interface LandingWrapperProps {
  children: React.ReactNode
  contactRef?: RefObject<HTMLDivElement>
}

const LandingWrapper: FC<LandingWrapperProps> = ({children, contactRef}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className='landing-wrapper'>
      <LandingHeader onMenuClick={() => setIsMenuOpen(true)} />
      <LandingMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        contactRef={contactRef}
      />

      <main className='landing-wrapper__content'>{children}</main>
    </div>
  )
}

export {LandingWrapper}
