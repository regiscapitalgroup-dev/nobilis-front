import {Formik, Form, Field, FieldArray} from 'formik'
import {useEffect, useState} from 'react'
import * as Yup from 'yup'
import CityAutocompleteField from '../../../modules/auth/components/fields/CityAutocompleteField'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import RelationAutocompleteField from './fields/RelationsAutocompleteField'
import {MultipleCitiesAutocompleteField} from './fields/MultipleCitiesAutocompleteField'
import {useUserProfileContext} from '../../../context/UserProfileContext'
import {updateProfileConfidential} from '../../../services/profileAdminService'
import {useHistory} from 'react-router-dom'
import {useAlert} from '../../../hooks/utils/useAlert'
import {getMaxBirthdayDate} from '../../../utils/dateValidations'

const ProfileConfidentialForm: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const [selectedCities, setSelecteCities] = useState<string[]>([])
  const {data, searchParams, refetch} = useUserProfileContext()
  const navigate = useHistory()
  const {showError} = useAlert()

 /*  useEffect(() => {
    if (data?.oftenIn && data.oftenIn.length > 0) {
      setSelecteCities(data.oftenIn)
    }
  }, [data]) */

  return (
    <Formik
      enableReinitialize
      initialValues={{
        email: data?.email || '',
        dob: data?.birthday || '',
        phone: data?.phoneNumber || '',
        contactMethods: [
          ...(data?.preferedEmail ? ['email'] : []),
          ...(data?.preferedPhone ? ['phone'] : []),
        ],
        address: '',
        cityCountry: data?.city,
        citiesOfInterest: [],
        partnerName: '',
        partnerSurname: '',
        relatives: [
          {
            name: '',
            surname: '',
            yearOfBirth: '',
            relation: {id: 0, name: ''},
          },
        ],
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
      })}
      onSubmit={async (values, {resetForm}) => {
        try {
          setLoading(true)

          const payload = {
            email: values.email,
            birthday: values.dob,
            phone_number: values.phone,
            contact_methods: values.contactMethods,
            address: values.address,
            city_country: values.cityCountry,
            cities_of_interest: selectedCities,
            partner: {
              name: values.partnerName,
              surname: values.partnerSurname,
            },
            relatives: values.relatives
              .filter((r) => r.name.trim() || r.surname.trim())
              .map((r) => ({
                first_name: r.name,
                last_name: r.surname,
                year_of_birth: Number(r.yearOfBirth),
                relationship_id: r.relation?.id || null,
              })),
          }

          await updateProfileConfidential(
            payload,
            !!searchParams.userSelected ? searchParams.userSelected : ''
          )
          await refetch()

          // navigate.push('/biography')
        } catch (error: any) {
          console.error(error)
          const statusCode = error?.response?.status || 500
          showError({
            title: 'Unable to update confidential profile',
            message: "We couldn't save your changes. Please review your information and try again.",
            errorCode: `CONFIDENTIAL_${statusCode}`,
          })
        } finally {
          setLoading(false)
        }
      }}
    >
      {({values}) => (
        <Form className='profile-confidential-form profile-form-base'>
          {/* Header */}
          <div className='confidential-header'>
            <h2 className='confidential-header__title'>Edit Confidential Profile Details</h2>
            <p className='confidential-header__desc'>
              Your contacts and personal details are kept strictly private and used solely by
              Nobilis to facilitate your wellbeing in the community.
            </p>
          </div>

          {/* Section: General Information */}
          <div className='form-section'>
            <h3 className='section-title'>General Information</h3>

            <div className='form-field'>
              <label className='field-label'>Email</label>
              <Field name='email' className='input' disabled />
            </div>

            <div className='form-row'>
              <div className='form-field'>
                <label className='field-label'>Date of Birth</label>
                <Field type='date' name='dob' className='input' max={getMaxBirthdayDate()} />
              </div>

              <div className='form-field'>
                <label className='field-label'>Phone</label>
                <div className='profile-input-wrapper'>
                  <Field name='phone'>
                    {({field, form}: any) => (
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
              </div>
            </div>

            <div className='form-field'>
              <span className='field-subtitle'>Preferred Contact Method</span>
              <div className='checkbox-group'>
                <label>
                  <Field type='checkbox' name='contactMethods' value='email' />
                  Email
                </label>
                <label>
                  <Field type='checkbox' name='contactMethods' value='phone' />
                  Phone
                </label>
              </div>
            </div>
          </div>

          {/* Section: Postal Address */}
          <div className='form-section'>
            <div className='section-header'>
              <h3 className='section-title'>Postal Address</h3>
              <p className='section-desc'>
                Required for exclusive Nobilis mailings: letters, invitations, gifts, and more.
              </p>
            </div>

            <div className='form-field'>
              <label className='field-label'>Address</label>
              <Field name='address' className='input' />
            </div>

            <div className='form-field'>
              <label className='field-label'>City & Country</label>
              <CityAutocompleteField name='cityCountry' />
            </div>
          </div>

          {/* Section: Cities of Interest */}
          <div className='form-section'>
            <div className='section-header'>
              <h3 className='section-title'>Cities of Interest – often in</h3>
              <p className='section-desc'>
                Add cities you frequently visit or stay in, aside from your primary residence.
              </p>
            </div>

            <MultipleCitiesAutocompleteField values={selectedCities} onChange={setSelecteCities} />
            <div className='form-add' onClick={() => alert('coming soon')}>
              + Add more
            </div>
          </div>

          {/* Section: Family Relations */}
          <div className='form-section'>
            <h3 className='section-title'>Family Relations</h3>

            <div className='section-header'>
              <span className='field-label-part'>YOUR LIFE PARTNER (If applicable)</span>
              <p className='partner-desc'>
                If your partner meets Nobilis’ qualifications, they are eligible for a Life Partner
                Discount on their own Nobilis account. If not, or not willing to create the account,
                they can be linked to your profile and join you in Nobilis Experiences alongside
                your closest relatives (parents, siblings) and children (up to 21 years old).
                <br />
                <br />
                Relationships must have lasted at least one year to qualify.
              </p>
            </div>

            <div className='form-row'>
              <div className='form-field'>
                <label className='field-label'>Name</label>
                <Field name='partnerName' className='input' />
              </div>
              <div className='form-field'>
                <label className='field-label'>Surname</label>
                <Field name='partnerSurname' className='input' />
              </div>
            </div>
          </div>

          {/* Section: Relatives */}
          <div className='form-section'>
            <div className='section-header'>
              <h3 className='section-title'>Your Relatives</h3>
              <p className='section-desc'>
                Nobilis supports you and your family in enjoying quality time together and within
                the community. To include your loved ones, please register your closest relatives.
              </p>
            </div>

            <FieldArray name='relatives'>
              {({push}) => (
                <>
                  {values.relatives.map((relative, index) => (
                    <div key={index} className='form-grid-2x2'>
                      <div className='form-field'>
                        <label className='field-label'>Name</label>
                        <Field name={`relatives.${index}.name`} className='input' />
                      </div>
                      <div className='form-field'>
                        <label className='field-label'>Surname</label>
                        <Field name={`relatives.${index}.surname`} className='input' />
                      </div>
                      <div className='form-field'>
                        <label className='field-label'>Year of Birth</label>
                        <Field name={`relatives.${index}.yearOfBirth`} className='input' />
                      </div>
                      <div className='form-field'>
                        <label className='field-label'>Relation</label>
                        <RelationAutocompleteField name={`relatives.${index}.relation`} />
                      </div>
                    </div>
                  ))}

                  <div
                    className='form-add'
                    onClick={
                      () => alert('coming soon')
                      /*  push({
                        name: '',
                        surname: '',
                        yearOfBirth: '',
                        relation: { id: 0, name: '' },
                      }) */
                    }
                  >
                    + Add more relatives
                  </div>
                </>
              )}
            </FieldArray>
          </div>

          {/* Actions */}
          <div className='form-actions'>
            <button
              type='button'
              className='btn-secondary'
              onClick={() => navigate.push('/biography')}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='btn nb-btn-primary'
              disabled={loading}
              aria-busy={loading ? 'true' : 'false'}
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

export default ProfileConfidentialForm
