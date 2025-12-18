import {Formik, Form, Field} from 'formik'
import CityAutocompleteField from '../../../modules/auth/components/fields/CityAutocompleteField'
import {useState} from 'react'
import {IndustriesAutocompleteField} from './fields/IndustriesAutocompleteField'
import {updateProfileProfessional} from '../../../services/profileAdminService'
import {useHistory} from 'react-router-dom'
import {useUserProfileContext} from '../../../context/UserProfileContext'
import {useAlert} from '../../../hooks/utils/useAlert'

export default function ProfessionalOverviewForm() {
  const [loading, setLoading] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const navigate = useHistory()
  const {refetch, searchParams} = useUserProfileContext()
  const {showError} = useAlert()

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    )
  }

  const allInterests = [
    'Entrepreneurship',
    'Government',
    'Legacy Building',
    'Career Change',
    'Investments',
    'Mentorship',
    'Philanthropy',
    'Professional Growth',
  ]
  return (
    <Formik
      initialValues={{
        organization: '',
        role: '',
        city: '',
        currentRole: false,
        from: '',
        to: '',
        website: '',

        boardOrganization: '',
        boardRole: '',
        boardCity: '',
        boardCurrent: false,
        boardFrom: '',
        boardTo: '',
        boardWebsite: '',

        nonprofitOrganization: '',
        nonprofitRole: '',
        nonprofitCity: '',
        nonprofitCurrent: false,
        nonprofitFrom: '',
        nonprofitTo: '',
        nonprofitWebsite: '',

        eduOrganization: '',
        eduRole: '',
        eduCity: '',
        eduCurrent: false,
        eduFrom: '',
        eduTo: '',
        eduWebsite: '',

        industries: [],
        interests: [],
      }}
      onSubmit={async (values, {resetForm}) => {
        try {
          setLoading(true)

          const payload = {
            ...values,
            interests: selectedInterests,
            industries: selectedIndustries,
          }


          await updateProfileProfessional(
            payload,
            !!searchParams.userSelected ? searchParams.userSelected : ''
          )
          setLoading(false)
          await refetch()
          navigate.push('/biography')
        } catch (error: any) {
          console.log(error)
          const statusCode = error?.response?.status || 500
          showError({
            title: 'Unable to update professional overview',
            message: "We couldn't save your changes. Please review your information and try again.",
            errorCode: `PROFESSIONAL_OVERVIEW_${statusCode}`,
          })
        } finally {
          setLoading(false)
        }
      }}
    >
      {() => (
        <Form className='pf-form'>
          {/* Header */}
          <div className='pf-header'>Edit Your Professional Overview</div>

          {/* Organizations */}
          <div className='pf-section'>
            <div className='pf-section__title'>Organizations I am involve in / Positions</div>
            <div className='pf-section__desc'>
              Please list all relevant organizations you’d like to showcase in your profile, both
              current and past.
            </div>

            <div className='pf-fields'>
              <div className='pf-row'>
                <div className='pf-field'>
                  <label className='pf-label'>Organization</label>
                  <Field name='organization' className='pf-input' />
                </div>
                <div className='pf-field'>
                  <label className='pf-label'>Role</label>
                  <Field name='role' className='pf-input' />
                </div>
              </div>

              <div className='pf-field'>
                <label className='pf-label'>City</label>
                <CityAutocompleteField name='city' />
              </div>

              <div className='pf-checkbox'>
                <Field type='checkbox' name='currentRole' className='pf-check' />
                <span>I am currently serving in this role</span>
              </div>

              <div className='pf-row'>
                <div className='pf-field'>
                  <label className='pf-label'>From</label>
                  <Field type='date' name='from' className='pf-input' />
                </div>
                <div className='pf-field'>
                  <label className='pf-label'>To</label>
                  <Field type='date' name='to' className='pf-input' />
                </div>
              </div>

              <div className='pf-field'>
                <label className='pf-label'>Website url</label>
                <Field name='website' className='pf-input' />
              </div>
            </div>
            <div className='pf-add' onClick={() => alert('coming soon')}>
              + Add more
            </div>
          </div>

          {/* Board */}
          <div className='pf-section'>
            <div className='pf-section__title'>I am on board</div>
            <div className='pf-section__desc'>List all relevant organizations</div>

            <div className='pf-fields'>
              <div className='pf-row'>
                <div className='pf-field'>
                  <label className='pf-label'>Organization</label>
                  <Field name='boardOrganization' className='pf-input' />
                </div>
                <div className='pf-field'>
                  <label className='pf-label'>Role</label>
                  <Field name='boardRole' className='pf-input' />
                </div>
              </div>

              <div className='pf-field'>
                <label className='pf-label'>City</label>
                <CityAutocompleteField name='boardCity' />
              </div>

              <div className='pf-checkbox'>
                <Field type='checkbox' name='boardCurrent' className='pf-check' />
                <span>I am currently serving in this role</span>
              </div>

              <div className='pf-row'>
                <div className='pf-field'>
                  <label className='pf-label'>From</label>
                  <Field type='date' name='boardFrom' className='pf-input' />
                </div>
                <div className='pf-field'>
                  <label className='pf-label'>To</label>
                  <Field type='date' name='boardTo' className='pf-input' />
                </div>
              </div>

              <div className='pf-field'>
                <label className='pf-label'>Website url</label>
                <Field name='boardWebsite' className='pf-input' />
              </div>
            </div>
            <div className='pf-add' onClick={() => alert('coming soon')}>
              + Add more
            </div>
          </div>

          {/* Nonprofit */}
          <div className='pf-section'>
            <div className='pf-section__title'>
              Do you lead a nonprofit or charitable organization that you established or support?
            </div>

            <div className='pf-fields'>
              <div className='pf-row'>
                <div className='pf-field'>
                  <label className='pf-label'>Organization</label>
                  <Field name='nonprofitOrganization' className='pf-input' />
                </div>
                <div className='pf-field'>
                  <label className='pf-label'>Role</label>
                  <Field name='nonprofitRole' className='pf-input' />
                </div>
              </div>

              <div className='pf-field'>
                <label className='pf-label'>City</label>
                <CityAutocompleteField name='nonprofitCity' />
              </div>

              <div className='pf-checkbox'>
                <Field type='checkbox' name='nonprofitCurrent' className='pf-check' />
                <span>I am currently serving in this role</span>
              </div>

              <div className='pf-row'>
                <div className='pf-field'>
                  <label className='pf-label'>From</label>
                  <Field type='date' name='nonprofitFrom' className='pf-input' />
                </div>
                <div className='pf-field'>
                  <label className='pf-label'>To</label>
                  <Field type='date' name='nonprofitTo' className='pf-input' />
                </div>
              </div>

              <div className='pf-field'>
                <label className='pf-label'>Website url</label>
                <Field name='nonprofitWebsite' className='pf-input' />
              </div>
            </div>
            <div className='pf-add' onClick={() => alert('coming soon')}>
              + Add another organization
            </div>
          </div>

          {/* Education */}
          <div className='pf-section'>
            <div className='pf-section__title'>Education</div>
            <div className='pf-section__desc'>
              List all relevant universities and educational institutions.
            </div>

            <div className='pf-fields'>
              <div className='pf-row'>
                <div className='pf-field'>
                  <label className='pf-label'>Organization</label>
                  <Field name='eduOrganization' className='pf-input' />
                </div>
                <div className='pf-field'>
                  <label className='pf-label'>Role</label>
                  <Field name='eduRole' className='pf-input' />
                </div>
              </div>

              <div className='pf-field'>
                <label className='pf-label'>City</label>
                <CityAutocompleteField name='eduCity' />
              </div>

              <div className='pf-checkbox'>
                <Field type='checkbox' name='eduCurrent' className='pf-check' />
                <span>I am currently studying</span>
              </div>

              <div className='pf-row'>
                <div className='pf-field'>
                  <label className='pf-label'>From</label>
                  <Field type='date' name='eduFrom' className='pf-input' />
                </div>
                <div className='pf-field'>
                  <label className='pf-label'>To</label>
                  <Field type='date' name='eduTo' className='pf-input' />
                </div>
              </div>

              <div className='pf-field'>
                <label className='pf-label'>Website url</label>
                <Field name='eduWebsite' className='pf-input' />
              </div>
            </div>
            <div className='pf-add' onClick={() => alert('coming soon')}>
              + Add more
            </div>
          </div>

          {/* Industries */}
          <div className='pf-section'>
            <div className='pf-section__title'>What industries do you have expertise in?</div>
            <div className='pf-field'>
              <label className='pf-label'>Select relevant industries</label>
              <IndustriesAutocompleteField
                values={selectedIndustries}
                onChange={setSelectedIndustries}
              />
            </div>
          </div>

          {/* Interests */}
          <div className='pf-section'>
            <div className='pf-section__title'>Please indicate your key Professional Interests</div>
            <div className='pf-section__desc italic'>Select all that apply</div>

            <div className='pf-interests'>
              {allInterests.map((interest) => (
                <div
                  key={interest}
                  className={`pf-chip ${selectedInterests.includes(interest) ? 'is-selected' : ''}`}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}

          <div className='pf-actions'>
            <button
              type='reset'
              className='pf-btn pf-btn--cancel'
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
  )
}
