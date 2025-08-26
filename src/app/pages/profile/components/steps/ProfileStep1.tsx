import React, {useState} from 'react'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import SocialMediaModal from '../SocialMediaModal'
import PhoneInput from 'react-phone-input-2'
import {LanguageAutocompleteField} from '../fields/LanguageAutocompleteField'
import {KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'

type SocialMediaItem = {
  id: string
  name: string
  icon: string
  url: string
}

type Props = {
  initialData: any
  onSubmit: (data: any) => void
}

const Step1Schema = Yup.object().shape({
  introductionHeadline: Yup.string().max(220, 'Máximo 220 caracteres'),
  alias: Yup.string(),
  name: Yup.string(),
  email: Yup.string().email('Email inválido'),
  dateOfBirth: Yup.string(),
  phone: Yup.string(),
 /*  preferredContactMethod: Yup.array().min(1, 'Selecciona al menos uno'), */
  languageSpoken: Yup.array(),
  cityCountry: Yup.string(),
})

export default function ProfileStep1({initialData, onSubmit}: Props) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [socialMediaItems, setSocialMediaItems] = useState<SocialMediaItem[]>(
    initialData.socialMedia || []
  )
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    initialData.languageSpoken || []
  )

  const handleSocialMediaSelect = (option: any) => {
    const newItem: SocialMediaItem = {
      id: option.id,
      name: option.name,
      icon: option.icon,
      url: '',
    }
    setSocialMediaItems([...socialMediaItems, newItem])
  }

  const handleSocialMediaUrlChange = (id: string, url: string) => {
    setSocialMediaItems((items) => items.map((item) => (item.id === id ? {...item, url} : item)))
  }

  const handleFormSubmit = (values: any) => {
    const formData = {
      ...values,
      languageSpoken: selectedLanguages,
      socialMedia: socialMediaItems,
    }
    onSubmit(formData)
  }

  return (
    <Formik
      initialValues={{
        introductionHeadline: initialData.introductionHeadline || '',
        alias: initialData.alias || '',
        name: initialData.name || '',
        email: initialData.email || '',
        dateOfBirth: initialData.dateOfBirth || '',
        phone: initialData.phone || '',
        preferredContactMethod: initialData.preferredContactMethod || [],
        cityCountry: initialData.cityCountry || '',
      }}
      validationSchema={Step1Schema}
      onSubmit={handleFormSubmit}
    >
      {() => (
        <Form className='profile-card'>
          {/* Introduction Headline */}
          <div className='profile-form-group'>
            <label>Introduction headline</label>
            <Field name='introductionHeadline' placeholder='Type your introduction headline here' />
            <small>Maximum 220 character</small>
          </div>

          {/* Alias */}
          <div className='profile-form-group'>
            <label>Alias / Title (if applicable)</label>
            <Field name='alias' />
          </div>

          {/* Name + Email */}
          <div className='profile-form-row'>
            <div className='profile-form-group'>
              <label>Name</label>
              <Field name='name' />
            </div>
            <div className='profile-form-group'>
              <label>Email</label>
              <Field name='email' type='email' />
              <small>This information will not be displayed to public</small>
            </div>
          </div>

          {/* Fecha + Teléfono */}
          <div className='profile-form-row'>
            {/* Date of Birth */}
            <div className='profile-form-group profile-form-date'>
              <label>Date of birth</label>
              <div className='profile-input-wrapper'>
                <Field
                  name='dateOfBirth'
                  type='date'
                  className='profile-input profile-input-date'
                />
              </div>
              <small>This information will not be displayed to public</small>
            </div>

            {/* Phone */}
            <div className='profile-form-group'>
              <label>Phone</label>
              <div className='profile-input-wrapper'>
                <PhoneInput
                  country='us'
                  placeholder='+1'
                  containerClass='profile-input'
                  disableDropdown
                />
              </div>
              <small>This information will not be displayed to public</small>
            </div>
          </div>

          {/* Método de contacto */}
          <div className='profile-form-group'>
            <label>Preferred Contact Method</label>
            <div className='profile-checkbox-row'>
              <label className='profile-checkbox'>
                <Field type='checkbox' name='preferredContactMethod' value='email' />
                <span className='profile-checkbox-box'></span>
              </label>
              <div>Email</div>
              <label className='profile-checkbox'>
                <Field type='checkbox' name='preferredContactMethod' value='phone' />
                <span className='profile-checkbox-box'></span>
              </label>
              <div>Phone</div>
            </div>
            <small>This information will not be displayed to public</small>
          </div>

          {/* Idioma */}
          <div className='profile-form-group'>
            <label>Language spoken</label>
            <LanguageAutocompleteField values={selectedLanguages} onChange={setSelectedLanguages} />
          </div>

          {/* Social Media */}
          <div className='profile-form-group social-media-group'>
            <label>Social Media & Online Presence</label>
            {socialMediaItems.map((item) => (
              <div key={item.id} className='social-media-input'>
                <div className='social-media-input-content'>
                  <KTSVG path={toAbsoluteUrl(item.icon)} className='social-media-input-icon' />
                  <input
                    type='text'
                    placeholder={`Add your ${item.name.toLowerCase()} profile URL`}
                    value={item.url}
                    onChange={(e) => handleSocialMediaUrlChange(item.id, e.target.value)}
                    className='social-media-input-field'
                  />
                </div>
              </div>
            ))}

            {/* Botón para agregar */}
            <div className='social-media-add-btn' onClick={() => setModalOpen(true)}>
              {socialMediaItems.length > 0
                ? '+ Add Another'
                : '+ Add Social Media & Online Presence'}
            </div>

            <SocialMediaModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              onSelect={handleSocialMediaSelect}
            />
          </div>

          {/* Ciudad */}
          <div className='profile-form-group'>
            <label>City & Country</label>
            <Field name='cityCountry' />
          </div>

          {/* Botón Continue */}
          <button type='submit' className='btn nb-btn-outline'>
            <span className='nb-heading-md'>continue</span>
            <img
              src='/media/svg/nobilis/vector1.svg'
              alt=''
              className='nb-btn-icon nb-btn-icon--black'
            />
          </button>
        </Form>
      )}
    </Formik>
  )
}
