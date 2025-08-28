import React, {useLayoutEffect, useState} from 'react'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import ProfileStep1 from './components/steps/ProfileStep1'
import ProfileStep2 from './components/steps/ProfileStep2'
import { SocialProfile, UserProfile } from './models/ProfileModel'
import { updateUserProfile } from '../../services/profileService'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../setup'
import { useHistory } from 'react-router-dom'
import { UserModel } from '../../modules/auth/models/UserModel'

type ProfileData = {
  introductionHeadline: string
  alias: string
  name: string
  email: string
  dateOfBirth: string
  phone: string
  preferredContactMethod: string[]
  languageSpoken: string[]
  social_media_profiles: any[]
  cityCountry: string
}

export default function ProfileBasePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const user = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel;
  const navigate = useHistory();
  const fullName = `${user.firstName} ${user.lastName}`
  const [profileData, setProfileData] = useState<ProfileData>({
    introductionHeadline: '',
    alias: '',
    name: fullName,
    email: user?.email,
    dateOfBirth: '',
    phone: '',
    preferredContactMethod: [],
    languageSpoken: [],
    social_media_profiles: [],
    cityCountry: '',
  })

  const mapToApiPayload = (
    data: ProfileData,
    photoFile?: File | null
  ): UserProfile => {
    const social_media_profiles: SocialProfile[] | undefined =
      (data.social_media_profiles || [])
        .filter((x: any) => x?.url)
        .map((x: any) => ({
          platform_name: String(x.name ?? "").trim(),
          profile_url: String(x.url ?? "").trim(),
        }));

    return {
      introduction_headline: data.introductionHeadline ?? "",
      alias_title: data.alias ?? "",
      profile_picture: photoFile ?? "", 
      birthday: data.dateOfBirth ?? "",
      phone_number: data.phone ?? "",
      city: data.cityCountry ?? "",
      languages: (data.languageSpoken ?? []) as string[],
      social_media_profiles,
      street:'',
      postal_code:''
    };
  };

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

  const handleStep2Submit = async(data: { photo?: File | null }) => {
    const finalData = {...profileData, ...data}
    setProfileData(finalData)

    try {
      const payload = mapToApiPayload(finalData, data.photo ?? null)
      const resp = await updateUserProfile( payload)
      

    } catch (err) {
      console.error('Error actualizando perfil:', err)
    } finally {
    }
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
