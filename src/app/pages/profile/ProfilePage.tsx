import React, {useLayoutEffect, useState} from 'react'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import ProfileStep1 from './components/steps/ProfileStep1'
import ProfileStep2 from './components/steps/ProfileStep2'

type ProfileData = {
  // Step 1
  introductionHeadline: string
  alias: string
  name: string
  email: string
  dateOfBirth: string
  phone: string
  preferredContactMethod: string[]
  languageSpoken: string[]
  socialMedia: any[]
  cityCountry: string

  // Step 2 (agregar campos según necesites)
  // profession: string
  // experience: string
  // etc...
}

export default function ProfileBasePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [profileData, setProfileData] = useState<ProfileData>({
    introductionHeadline: '',
    alias: '',
    name: '',
    email: '',
    dateOfBirth: '',
    phone: '',
    preferredContactMethod: [],
    languageSpoken: [],
    socialMedia: [],
    cityCountry: '',
  })

  useLayoutEffect(() => {
    if (currentStep === 1  || currentStep === 2  ) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    }
  }, [currentStep])

  const handleStep1Submit = (data: Partial<ProfileData>) => {
    setProfileData((prev) => ({...prev, ...data}))
    setCurrentStep(2)
  }

  const handleStep2Submit = (data: Partial<ProfileData>) => {
    const finalData = {...profileData, ...data}
    console.log('Final profile data:', finalData)
    // Aquí enviarías los datos al servidor
  }

  const goBackToStep1 = () => {
    setCurrentStep(1)
  }

  return (
    <div className='profile-shell'>
      {/* Imagen de fondo común */}
      <div className='profile-hero'>
        <img
          src={toAbsoluteUrl('/media/login-room.png')}
          alt='background'
          className='profile-hero__img'
        />
      </div>

      {/* Contenido */}
      <div className='profile-content'>
        <div className='profile-logo'>NOBILIS</div>

        {/* Header dinámico */}
        <div className='profile-header'>
          <p className='profile-step'>Step {currentStep}/2</p>
          <h1 className='profile-title'>
            {currentStep === 1 ? 'General information' : 'Profile photo'}
          </h1>
          <p className='profile-subtitle'>
            {currentStep === 1
              ? 'This information will help us to contact and have the latest data about you!'
              : 'Your photo helps other users get to know your profile professional.'}
          </p>
        </div>

        {/* Steps dinámicos */}
        {currentStep === 1 && (
          <ProfileStep1 initialData={profileData} onSubmit={handleStep1Submit} />
        )}

        {currentStep === 2 && (
          <ProfileStep2
            initialData={profileData}
            onSubmit={handleStep2Submit}
            onBack={goBackToStep1}
          />
        )}
      </div>
    </div>
  )
}
