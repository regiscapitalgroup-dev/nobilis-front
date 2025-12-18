import {FC, useEffect, useState} from 'react'
import {Formik, Form} from 'formik'
import {HobbiesAutocompleteField} from './fields/HobbiesAutocompleteField'
import CityAutocompleteField from '../../../modules/auth/components/fields/CityAutocompleteField'
import ClubesAutocompleteField from './fields/ClubesAutocompleteField'
import {updateProfilePersonal} from '../../../services/profileAdminService'
import {useHistory} from 'react-router-dom'
import {useUserProfileContext} from '../../../context/UserProfileContext'
import {useAlert} from '../../../hooks/utils/useAlert'

const ProfileAdminPersonalForm: FC = () => {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([])
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const navigate = useHistory()
  const {refetch, searchParams, data} = useUserProfileContext()
  const {showError} = useAlert()

  useEffect(() => {
    if (data?.personalDetail?.hobbies && data.personalDetail.hobbies.length > 0) {
      setSelectedHobbies(data.personalDetail.hobbies)
    }
  }, [data])

  useEffect(() => {
    if (data?.personalDetail?.interests && data.personalDetail.interests.length > 0) {
      setSelectedInterests(data.personalDetail.interests)
    }
  }, [data])

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
        enableReinitialize
        initialValues={{
          hobbies: '',
          clubName: data?.personalDetail?.clubs?.[0]?.name || '',
          city: data?.personalDetail?.clubs?.[0]?.city || '',
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

            await updateProfilePersonal(
              payload,
              !!searchParams.userSelected ? searchParams.userSelected : ''
            )
            await refetch()
            navigate.push('/biography')
          } catch (error: any) {
            console.log(error)

            const statusCode = error?.response?.status || 500
            showError({
              title: 'Unable to update personal details',
              message:
                "We couldn't save your changes. Please review your information and try again.",
              errorCode: `PERSONAL_DETAILS_${statusCode}`,
            })
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
                <div className='pf-personal__add' onClick={() => alert('coming soon')}>
                  + Add more
                </div>
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
    </div>
  )
}

export default ProfileAdminPersonalForm
