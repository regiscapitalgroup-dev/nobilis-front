import React, {useEffect, useLayoutEffect, useState} from 'react'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import ProfileStep1 from './components/steps/ProfileStep1'
import ProfileStep2 from './components/steps/ProfileStep2'
import {SocialProfile, UserProfile} from './models/ProfileModel'
import {updateUserProfile} from '../../services/profileService'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../setup'
import {UserModel} from '../../modules/auth/models/UserModel'
import {useUserProfileContext} from '../../context/UserProfileContext'

type ProfileData = {
  introduction_headline: string
  alias_title: string
  name: string
  email: string
  birthday: string
  phone_number: string
  preferred_phone: boolean
  prefered_email: boolean
  languageSpoken: string[]
  social_media_profiles: any[]
  city: string
}

export default function ProfileBasePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const user = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  const fullName = `${user.firstName} ${user.lastName}`
  const {data} = useUserProfileContext()
  
  const [profileData, setProfileData] = useState<ProfileData>({
    introduction_headline: '',
    alias_title: '',
    name: fullName,
    email: user?.email,
    birthday: data?.birthday ?? '',
    phone_number: data?.phoneNumber ?? '',
    preferred_phone: false,
    prefered_email: false,
    languageSpoken: [],
    social_media_profiles: [],
    city: data?.city ?? '',
  })

  useEffect(() => {
    if (data) {
      setProfileData((prev) => ({
        ...prev,
        birthday: data.birthday ?? '',
        phone_number: data.phoneNumber ?? '',
        city: data.city ?? '',
      }))
    }
  }, [data])

  const mapToApiPayload = (data: ProfileData, photoFile?: File | null): UserProfile => {
    const social_media_profiles: SocialProfile[] | undefined = (data.social_media_profiles || [])
      .filter((x: any) => x?.url)
      .map((x: any) => {
        let url = String(x.url ?? '').trim()

        if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
          url = `https://${url}`
        }

        return {
          platform_name: String(x.name ?? '').trim(),
          profile_url: url,
        }
      })

    return {
      name: data.name ?? '',
      email: data.email ?? '',
      introduction_headline: data.introduction_headline ?? '',
      alias_title: data.alias_title ?? '',
      profile_picture: photoFile ?? null,
      birthday: data.birthday ?? '',
      phone_number: data.phone_number ?? '',
      city: data.city ?? '',
      languages: (data.languageSpoken ?? []) as string[],
      social_media_profiles,
      prefered_email: data.prefered_email ?? false,
      preferred_phone: data.preferred_phone ?? false,
    }
  }

  useLayoutEffect(() => {
    if (currentStep === 1 || currentStep === 2) {
      requestAnimationFrame(() => {
        window.scrollTo({top: 0, behavior: 'smooth'})
      })
    }
  }, [currentStep])

  const handleStep1Submit = (data: Partial<ProfileData>) => {
    setProfileData((prev) => ({...prev, ...data}))
    setCurrentStep(2)
  }

  const handleStep2Submit = async (data: {photo?: File | null}) => {
    const finalData = {...profileData, ...data}
    setProfileData(finalData)

    const payload = mapToApiPayload(finalData, data.photo ?? null)
    
    await updateUserProfile(payload)
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
