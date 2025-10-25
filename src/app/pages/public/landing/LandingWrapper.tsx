// LandingWrapper.tsx
import {FC, useState} from 'react'
import {LandingHeader} from './components/LandingHeader'
import {LandingMenu} from './components/Landingmenu'
import {LandingFooter} from './components/LandingFooter'

interface LandingWrapperProps {
  children: React.ReactNode
}

const LandingWrapper: FC<LandingWrapperProps> = ({children}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <LandingHeader onMenuClick={() => setIsMenuOpen(true)} />
      <LandingMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {children}
      
     {/*  <LandingFooter /> */}
    </>
  )
}

export {LandingWrapper}