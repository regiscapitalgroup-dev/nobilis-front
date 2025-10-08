import {FC, useState} from 'react'
import {Formik, Form, Field} from 'formik'
import {KTSVG} from '../../../../_metronic/helpers'
import {HobbiesAutocompleteField} from './fields/HobbiesAutocompleteField'
import CityAutocompleteField from '../../../modules/auth/components/fields/CityAutocompleteField'
import ClubesAutocompleteField from './fields/ClubesAutocompleteField'
import {updateProfilePersonal} from '../../../services/profileAdminService'
import {useHistory} from 'react-router-dom'

const ProfileAdminPersonalForm: FC = () => {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([])
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const navigate = useHistory()

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    )
  }

  const allInterests = [
    'Building Relationships',
    'Continuous Learning',
    'Art/Music/Craft Creation',
    'Family',
    'Health and Wellness',
    'Spiritual Growth',
    'World Exploration',
    'Nature',
  ]

  return (
    <div className='pf-personal'>
      <Formik
        initialValues={{
          hobbies: '',
          clubName: '',
          city: '',
          interests: [],
        }}
        onSubmit={async (values, {resetForm}) => {
          try {
            setLoading(true)

            const payload = {
              ...values,
              hobbies: selectedHobbies,
              interests: selectedInterests,
            }

            await updateProfilePersonal(payload)
            setLoading(false)

            navigate.push('/biography')
          } catch (error: any) {
            console.log(error)
          } finally {
            setLoading(false)
          }
        }}
      >
        {() => (
          <Form className='pf-personal__form'>
            {/* Header */}
            <div className='pf-personal__header'>Edit Your Personal Details</div>

            <div className='pf-personal__sections'>
              {/* Hobbies */}
              <div className='pf-personal__section'>
                <div className='pf-personal__title'>Your Hobbies</div>
                <div className='pf-personal__field'>
                  <label className='pf-personal__label'>List your hobbies</label>
                  <HobbiesAutocompleteField
                    values={selectedHobbies}
                    onChange={setSelectedHobbies}
                  />
                </div>
              </div>

              {/* Clubs */}
              <div className='pf-personal__section'>
                <div className='pf-personal__title'>Your Clubs</div>
                <div className='pf-personal__desc'>
                  List any clubs or associations you belong to
                </div>
                <div className='pf-personal__row'>
                  <div className='pf-personal__field'>
                    <label className='pf-personal__label'>Club Name</label>
                    {/*  <Field
                      name='clubName'
                      className='pf-personal__input'                      
                    /> */}
                    <ClubesAutocompleteField name='clubName' />
                  </div>
                  <div className='pf-personal__field'>
                    <label className='pf-personal__label'>City</label>
                    <CityAutocompleteField name='city' />
                  </div>
                </div>
                <div className='pf-personal__add'>+ Add more</div>
              </div>

              {/* Personal Interests */}
              <div className='pf-personal__section'>
                <div className='pf-personal__title'>
                  Please indicate your key personal interests
                </div>
                <div className='pf-personal__desc'>Select all that apply</div>

                <div className='pf-personal__tags'>
                  {allInterests.map((interest) => (
                    <div
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`pf-personal__tag ${
                        selectedInterests.includes(interest) ? 'pf-personal__tag--selected' : ''
                      }`}
                    >
                      {interest}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className='pf-personal__actions'>
              <button
                type='button'
                className='pf-personal__btn pf-personal__btn--secondary'
                onClick={() => {
                  navigate.push('/biography')
                }}
              >
                Cancel
              </button>

              <button
                type='submit'
                className='pf-personal__btn pf-personal__btn--primary'
                disabled={loading}
                aria-busy={loading ? 'true' : 'false'}
              >
                {!loading ? (
                  <div className='pf-btn-inner'>
                    <span>save changes</span>
                    <img
                      src='/media/svg/nobilis/vector1.svg'
                      alt=''
                      className='nb-btn-icon nb-btn-icon--white'
                    />
                  </div>
                ) : (
                  <span className='indicator-progress'>
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
    </div>
  )
}

export default ProfileAdminPersonalForm
