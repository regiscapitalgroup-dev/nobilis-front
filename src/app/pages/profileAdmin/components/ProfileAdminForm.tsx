import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import {LanguageAutocompleteField} from '../../profile/components/fields/LanguageAutocompleteField'
import {useState} from 'react'
import SocialMediaModal from '../../profile/components/SocialMediaModal'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'

type SocialMediaItem = {
  id: string
  name: string
  icon: string
  url: string
}

const ProfileAdminForm: React.FC = () => {
  const [socialMediaItems, setSocialMediaItems] = useState<SocialMediaItem[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedCards, setSelectedCards] = useState<string[]>([])
  const MAX_LENGTH = 50
  const [countLength, setCountLength] = useState<number>(0)
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
      id: 'general',
      title: 'General Introductions',
      desc: 'Connect with fellow members in your area or those traveling nearby for informal meetings (e.g., lunch, dinner, cultural gatherings) to build relationships organically.',
    },
    {
      id: 'investment',
      title: 'Investment Opportunities',
      desc: 'Receive curated proposals and introductions related to exclusive investment opportunities.',
    },
    {
      id: 'business',
      title: 'Business Participation',
      desc: 'Open to employment, executive roles, advisory positions, or active involvement in select ventures.',
    },
    {
      id: 'impact',
      title: 'Impact Initiatives',
      desc: 'Be introduced to members leading non-profit or purpose-driven initiatives where your expertise, resources, or time could make a difference.',
    },
    {
      id: 'personal',
      title: 'Personal Relationships',
      desc: 'Open to curated introductions with potential for a meaningful relationship or life partner.',
    },
  ]
  const toggleCard = (id: string) => {
    setSelectedCards((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]))
  }

  const selectAll = () => {
    if (selectedCards.length === cards.length) {
      setSelectedCards([]) // desmarca todos si ya estaban
    } else {
      setSelectedCards(cards.map((c) => c.id)) // marca todos
    }
  }
  return (
    <Formik
      initialValues={{
        alias: '',
        name: '',
        surname: '',
        headline: '',
        residence: '',
        language: '',
        guidingPrinciple: '',
        introductions: ['general'],
        annualLimit: 'noLimit',
        quarterlyReports: 'yes',
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('Required'),
        surname: Yup.string().required('Required'),
      })}
      onSubmit={(values) => {
        console.log('Submit values 👉', values)
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
                <Field name='name' className='input' />
              </div>
              <div className='form-field'>
                <label className='field-label'>Surname</label>
                <Field name='surname' className='input' />
              </div>
            </div>

            <div className='form-field'>
              <label className='field-label'>Headline</label>
              <Field name='headline' className='input' />
              <div className='field-hint'>
                List the most significant titles that define you (e.g., Entrepreneur, CEO, Author,
                Philanthropist).
              </div>
            </div>

            <div className='form-field'>
              <label className='field-label'>Primary Residence</label>
              <Field name='residence' className='input' />
            </div>

            <div className='form-field'>
              <label className='field-label'>Language spoken</label>
              {/* <Field name="language" className="input" placeholder="English, Spanish..." /> */}
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
          </div>

          {/* Section: Guiding Principle */}
          <div className='guiding-principle-field'>
            <label className='gp-label'>Guiding Principle</label>
            <Field
              name='introduction_headline'
              maxLength={MAX_LENGTH}
              onChange={(e: any) => {
                const value = e.target.value
                setFieldValue('introduction_headline', value)
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

            <p className='intro-mgmt__hint cursor-pointer' onClick={selectAll}>
              Select all that apply
            </p>

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
            <button type='button' className='btn-secondary'>
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
