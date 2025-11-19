import React, {useState} from 'react'
import {Formik, Form, Field, useFormikContext} from 'formik'
import * as Yup from 'yup'
import SocialMediaModal from '../SocialMediaModal'
import PhoneInput from 'react-phone-input-2'
import {LanguageAutocompleteField} from '../fields/LanguageAutocompleteField'
import {KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import CityAutocompleteField from '../../../../modules/auth/components/fields/CityAutocompleteField'

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
  introduction_headline: Yup.string().max(220, 'Maximum 220 characters'),
  alias_title: Yup.string(),
  name: Yup.string(),
  email: Yup.string().email('Invalid email'),
  birthday: Yup.string(),
  phone_number: Yup.string(),
  languageSpoken: Yup.array(),
  city: Yup.string(),
})

const ProfileFormContent = ({
  initialData,
  onSubmit,
}: {
  initialData: any
  onSubmit: (data: any) => void
}) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [countLength, setCountLength] = useState<number>(
    initialData.introduction_headline?.length || 0
  )
  const MAX_LENGTH = 220

  const {setFieldValue, values} = useFormikContext<any>()

  const [socialMediaItems, setSocialMediaItems] = useState<SocialMediaItem[]>(
    initialData.social_media_profiles || []
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

  const handleFormSubmit = () => {
    const formData = {
      ...values,
      languageSpoken: selectedLanguages,
      social_media_profiles: socialMediaItems,
    }
    onSubmit(formData)
  }

  return (
    <Form className='profile-card'>
      {/* Introduction Headline */}
      <div className='profile-form-group'>
        <label>Introduction headline</label>
        <Field
          name='introduction_headline'
          maxLength={MAX_LENGTH}
          placeholder='Type your introduction headline here'
          onChange={(e: any) => {
            const value = e.target.value

            setFieldValue('introduction_headline', value)
            setCountLength(value.length)
          }}
        />
        <small>
          Maximum {countLength > 0 ? `${countLength} / ${MAX_LENGTH}` : `${MAX_LENGTH}`} character
        </small>
      </div>

      {/* Alias */}
      <div className='profile-form-group'>
        <label>Alias / Title (if applicable)</label>
        <Field name='alias_title' />
      </div>

      {/* Name + Email */}
      <div className='profile-form-row'>
        <div className='profile-form-group'>
          <label>Name</label>
          <Field name='name' />
        </div>
        <div className='profile-form-group'>
          <label>Email</label>
          <Field name='email' type='email' readOnly/>
          <small>This information will not be displayed to public</small>
        </div>
      </div>

      {/* Fecha + Teléfono */}
      <div className='profile-form-row'>
        {/* Date of Birth */}
        <div className='profile-form-group profile-form-date'>
          <label>Date of birth</label>
          <div className='profile-input-wrapper'>
            <Field name='birthday' type='date' className='profile-input profile-input-date' />
          </div>
          <small>This information will not be displayed to public</small>
        </div>

        {/* Phone */}
        <div className='profile-form-group'>
          <label>Phone</label>
          <div className='profile-input-wrapper'>
            <Field name='phone_number'>
              {({field, form, meta}: any) => (
                <PhoneInput
                  country='us'
                  placeholder='+1'
                  containerClass='profile-input'
                  disableDropdown
                  value={field.value || ''}
                  onChange={(val: string) => form.setFieldValue(field.name, val)}
                  onBlur={() => form.setFieldTouched(field.name, true)}
                />
              )}
            </Field>
          </div>
          <small>This information will not be displayed to public</small>
        </div>
      </div>

      {/* Método de contacto */}
      <div className='profile-form-group'>
        <label>Preferred Contact Method</label>
        <div className='profile-checkbox-row'>
          <label className='profile-checkbox'>
            <Field type='checkbox' name='prefered_email' />
            <span className='profile-checkbox-box'></span>
          </label>
          <div>Email</div>
          <label className='profile-checkbox'>
            <Field type='checkbox' name='preferred_phone' />
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
          {socialMediaItems.length > 0 ? '+ Add Another' : '+ Add Social Media & Online Presence'}
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
        <CityAutocompleteField name='city' />
      </div>

      {/* Botón Continue */}
      <button type='button' className='btn nb-btn-outline' onClick={handleFormSubmit}>
        <span className='nb-heading-md'>continue</span>
        <img
          src='/media/svg/nobilis/vector1.svg'
          alt=''
          className='nb-btn-icon nb-btn-icon--black'
        />
      </button>
    </Form>
  )
}

export default function ProfileStep1({initialData, onSubmit}: Props) {
  return (
    <Formik
      initialValues={{
        introduction_headline: initialData.introduction_headline || '',
        alias_title: initialData.alias_title || '',
        name: initialData.name || '',
        email: initialData.email || '',
        birthday: initialData.birthday || '',
        phone_number: initialData.phone_number || '',
        prefered_email: initialData.prefered_email,
        preferred_phone: initialData.preferred_phone,
        city: initialData.city || '',
      }}
      enableReinitialize={true}
      validationSchema={Step1Schema}
      onSubmit={() => {}}
    >
      {() => <ProfileFormContent initialData={initialData} onSubmit={onSubmit} />}
    </Formik>
  )
}
