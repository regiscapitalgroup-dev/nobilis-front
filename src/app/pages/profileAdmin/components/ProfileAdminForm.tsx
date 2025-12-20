import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {LanguageAutocompleteField} from '../../profile/components/fields/LanguageAutocompleteField'
import {useEffect, useState} from 'react'
import SocialMediaModal from '../../profile/components/SocialMediaModal'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {updateProfile} from '../../../services/profileAdminService'
import {useHistory} from 'react-router-dom'
import {useAlert} from '../../../hooks/utils/useAlert'
import {useUserProfileContext} from '../../../context/UserProfileContext'

type SocialMediaItem = {
  id: string
  name: string
  icon: string
  url: string
}

const ProfileAdminForm: React.FC = () => {
  const navigate = useHistory()
  const [socialMediaItems, setSocialMediaItems] = useState<SocialMediaItem[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedCards, setSelectedCards] = useState<string[]>([])
  const MAX_LENGTH = 50
  const [countLength, setCountLength] = useState<number>(0)
  const {showError} = useAlert()
  const {data, refetch, searchParams} = useUserProfileContext()

  useEffect(() => {
    if (data?.languages && data.languages.length > 0) {
      setSelectedLanguages(data.languages)
    }
  }, [data])

  useEffect(() => {
    if (data?.socialMediaProfiles && data.socialMediaProfiles.length > 0) {
      const iconMap: Record<string, string> = {
        Website: '/media/svg/nobilis/web.svg',
        Linkedin: '/media/svg/nobilis/lk.svg',
        Instagram: '/media/svg/nobilis/instagram.svg',
        Facebook: '/media/svg/nobilis/fb-black.svg',
        'X Profile': '/media/svg/nobilis/x.svg',
        Twitter: '/media/svg/nobilis/x.svg',
      }

      const idMap: Record<string, string> = {
        Website: 'website',
        Linkedin: 'linkedin',
        Instagram: 'instagram',
        Facebook: 'facebook',
        'X Profile': 'twitter',
        Twitter: 'twitter',
      }

      const mappedSocialMedia: SocialMediaItem[] = data.socialMediaProfiles.map(
        (profile, index) => ({
          id: idMap[profile.platformName] || `social-${index}`,
          name: profile.platformName,
          icon: iconMap[profile.platformName] || '/media/svg/nobilis/web.svg',
          url: profile.profileUrl,
        })
      )

      setSocialMediaItems(mappedSocialMedia)
    }
  }, [data])

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

  const cards = [
    {
      id: '1',
      title: 'General Introductions',
      desc: 'Connect with fellow members in your area or those traveling nearby for informal meetings (e.g., lunch, dinner, cultural gatherings) to build relationships organically.',
    },
    {
      id: '2',
      title: 'Investment Opportunities',
      desc: 'Receive curated proposals and introductions related to exclusive investment opportunities.',
    },
    {
      id: '3',
      title: 'Business Participation',
      desc: 'Open to employment, executive roles, advisory positions, or active involvement in select ventures.',
    },
    {
      id: '4',
      title: 'Impact Initiatives',
      desc: 'Be introduced to members leading non-profit or purpose-driven initiatives where your expertise, resources, or time could make a difference.',
    },
    {
      id: '5',
      title: 'Personal Relationships',
      desc: 'Open to curated introductions with potential for a meaningful relationship or life partner.',
    },
  ]
  const toggleCard = (id: string) => {
    setSelectedCards((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]))
  }
  return (
    <Formik
      enableReinitialize
      initialValues={{
        alias: data?.aliasTitle ?? '',
        name: data?.firstName ?? '',
        surname: data?.surname ?? '',
        headline: data?.introductionHeadline ?? '',
        residence: data?.city,
        guidingPrinciple: data?.guidingPrinciple ?? '',
        annualLimit: 'noLimit',
        quarterlyReports: 'yes',
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('This field is required'),
        surname: Yup.string().required('This field is required'),
      })}
      onSubmit={async (values) => {
        try {
          setLoading(true)

          const payload = {
            ...values,
            quarterlyReports: values.quarterlyReports === 'yes',
            introductions: selectedCards,
            languages: selectedLanguages,
            social_media_profiles: socialMediaItems.map((item) => ({
              platform_name: item.name,
              profile_url: item.url,
            })),
          }
          await updateProfile(payload, !!searchParams.userSelected ? searchParams.userSelected : '')
          await refetch()
          /* navigate.push('/biography') */
          setLoading(false)
        } catch (error: any) {
          setLoading(false)
          const statusCode = error?.response?.status || 500

          showError({
            title: 'Unable to update profile',
            message: "We couldn't save your changes. Please review your information and try again.",
            errorCode: `PROFILE_${statusCode}`,
          })
        }
      }}
    >
      {({values, setFieldValue}) => (
        <Form className='profile-admin-form  profile-form-base'>
          {/* Title */}
          <div className='form-header'>
            <h2 className='form-header__title'>Edit Your Profile</h2>
          </div>

          {/* Section: General Information */}
          <div className='form-section'>
            <h3 className='section-title'>General Information</h3>

            <div className='form-field'>
              <label className='field-label'>Alias / Title (if applicable)</label>
              <Field name='alias' className='input' />
              <div className='field-hint'>
                Pseudonym, Royal, Academic, Religious, or other title
              </div>
            </div>

            <div className='form-row'>
              <div className='form-field'>
                <label className='field-label'>Name</label>
                <Field name='name' className='input  input-text-style' />
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block input-text-style fs-8'>
                    <ErrorMessage name='name' />
                  </div>
                </div>
              </div>
              <div className='form-field'>
                <label className='field-label'>Surname</label>
                <Field name='surname' className='input' />
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block input-text-style fs-8'>
                    <ErrorMessage name='surname' />
                  </div>
                </div>
              </div>
            </div>

            <div className='form-field'>
              <label className='field-label'>Headline</label>
              <Field name='headline' className='input' />
              <div className='field-hint'>
                List the most significant titles that define you (e.g., Entrepreneur, CEO, Actor,
                Author, Philanthropist, F1 Driver, Nobel Laureate, Mother of four). Be specific.
              </div>
            </div>

            <div className='form-field'>
              <label className='field-label'>Primary Residence</label>
              <Field name='residence' className='input' />
            </div>

            <div className='form-field'>
              <label className='field-label'>Language spoken</label>
              <LanguageAutocompleteField
                values={selectedLanguages}
                onChange={setSelectedLanguages}
              />
            </div>
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
                {socialMediaItems.length > 0 ? '+ Add Another' : '+ Add'}
              </div>

              <SocialMediaModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSelect={handleSocialMediaSelect}
              />
            </div>
          </div>

          {/* Section: Guiding Principle */}
          <div className='guiding-principle-field'>
            <label className='gp-label'>Guiding Principle</label>
            <Field
              name='guidingPrinciple'
              maxLength={MAX_LENGTH}
              onChange={(e: any) => {
                const value = e.target.value
                setFieldValue('guidingPrinciple', value)
                setCountLength(value.length)
              }}
              className='gp-input'
            />
            <div className='gp-hint-row'>
              <small className='gp-hint'>
                In one sentence, please share the principle or belief that drives you.
              </small>
              <small className='gp-counter'>
                {countLength > 0
                  ? `${countLength} / ${MAX_LENGTH}`
                  : `${countLength} / ${MAX_LENGTH}`}{' '}
                characters
              </small>
            </div>
          </div>

          {/* Section: Introduction management */}
          <div className='intro-mgmt'>
            <h3 className='intro-mgmt__title'>Introduction Management</h3>
            <p className='intro-mgmt__desc'>
              At Nobilis, introductions are thoughtfully curated to foster meaningful, high-value
              relationships. Our platform uses a combination of intelligent algorithms and human
              review to facilitate connections that are aligned with your interests, values, and
              status.
              <br />
              <br />
              General Introductions are available to all members by default. Please indicate any
              additional areas in which you are open to receiving curated connections.
            </p>

            <p className='intro-mgmt__hint cursor-pointer'>Select all that apply</p>

            <div className='intro-mgmt__cards'>
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`intro-mgmt__card ${
                    selectedCards.includes(card.id) ? 'is-selected' : ''
                  }`}
                  onClick={() => toggleCard(card.id)}
                >
                  <div className='intro-mgmt__card-title'>{card.title}</div>
                  <div className='intro-mgmt__card-desc'>{card.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Annual Limits */}
          <div className='annual-limits'>
            <h3 className='annual-limits__title'>Annual Limits</h3>

            <p className='annual-limits__desc'>
              Choose to limit the number of introduction requests you receive annually
            </p>

            <div className='annual-limits__options'>
              <label className='annual-limits__radio'>
                <Field type='radio' name='annualLimit' value='noLimit' />
                No Limit
              </label>
              <label className='annual-limits__radio'>
                <Field type='radio' name='annualLimit' value='5' />
                Up to 5 introductions
              </label>
              <label className='annual-limits__radio'>
                <Field type='radio' name='annualLimit' value='10' />
                Up to 10 introductions
              </label>
            </div>

            <p className='annual-limits__desc'>
              Would you like to receive quarterly reports summarizing introduction requests that
              were declined?
            </p>

            <div className='annual-limits__options'>
              <label className='annual-limits__radio'>
                <Field type='radio' name='quarterlyReports' value='yes' />
                Yes
              </label>
              <label className='annual-limits__radio'>
                <Field type='radio' name='quarterlyReports' value='no' />
                No
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className='form-actions'>
            <button
              type='button'
              className='btn-secondary'
              onClick={() => {
                if (searchParams.userSelected) {
                  navigate.push(`/profile-member`)
                } else {
                  navigate.push('/biography')
                }
              }}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='btn nb-btn-primary'
              disabled={loading}
              aria-busy={loading ? 'true' : 'false'}
              aria-live='polite'
            >
              {!loading ? (
                <>
                  <span className='nb-heading-md'>save changes</span>
                  <img
                    src='/media/svg/nobilis/vector1.svg'
                    alt=''
                    className='nb-btn-icon nb-btn-icon--white'
                  />
                </>
              ) : (
                <span className='indicator-progress nb-heading-md'>
                  Please wait...
                  <span
                    className='spinner-border spinner-border-sm align-middle ms-2'
                    role='status'
                    aria-hidden='true'
                  />
                </span>
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default ProfileAdminForm
