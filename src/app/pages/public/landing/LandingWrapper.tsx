import {FC, useState} from 'react'
import {LandingHeader} from './components/LandingHeader'
import {LandingMenu} from './components/Landingmenu'

interface LandingWrapperProps {
  children: React.ReactNode
}

const LandingWrapper: FC<LandingWrapperProps> = ({children}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className='landing-wrapper'>
      <LandingHeader onMenuClick={() => setIsMenuOpen(true)} />
      <LandingMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className='landing-wrapper__content'>
        {children}
      </main>
    </div>
  )
}

export {LandingWrapper}