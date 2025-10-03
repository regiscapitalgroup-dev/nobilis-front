import {Formik, Form, Field, FieldArray} from 'formik'
import {useState} from 'react'
import * as Yup from 'yup'
import CityAutocompleteField from '../../../modules/auth/components/fields/CityAutocompleteField'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import RelationAutocompleteField from './fields/RelationsAutocompleteField'
import {MultipleCitiesAutocompleteField} from './fields/MultipleCitiesAutocompleteField'

const ProfileConfidentialForm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [selectedCities, setSelecteCities] = useState<string[]>([])

  return (
    <Formik
      initialValues={{
        email: 'jhondoe@email.com',
        dob: '',
        phone: '',
        contactMethods: [],
        address: '',
        cityCountry: '',
        citiesOfInterest: [''], // 👈 importante: ya existe el array
        partnerName: '',
        partnerSurname: '',
        relatives: [{name: '', surname: '', yearOfBirth: '', relation: ''}],
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
      })}
      onSubmit={(values) => {
        console.log('Confidential Submit 👉', values)
      }}
    >
      {({values, setFieldValue}) => (
        <Form className='profile-confidential-form  profile-form-base'>
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

            {/* Email */}
            <div className='form-field'>
              <label className='field-label'>Email</label>
              <Field name='email' className='input' disabled />
            </div>

            {/* DOB & Phone */}
            <div className='form-row'>
              <div className='form-field'>
                <label className='field-label'>Date of Birth</label>
                <Field type='date' name='dob' className='input' />
              </div>

              <div className='form-field'>
                <label className='field-label'>Phone</label>
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
              </div>
            </div>

            {/* Preferred Contact */}
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
              <CityAutocompleteField name='city' />
            </div>
          </div>

          <div className='form-section'>
            <div className='section-header'>
              <h3 className='section-title'>Cities of Interest – often in</h3>
              <p className='section-desc'>
                Add cities you frequently visit or stay in, aside from your primary residence.
              </p>
            </div>

            <MultipleCitiesAutocompleteField values={selectedCities} onChange={setSelecteCities} />

            <div className='form-add'>+ Add more</div>
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
                your closest relatives (parents, siblings) and children (up to 21 years old). <br />
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
                the community. To include your loved ones, please register your closest relatives
                (parents, siblings) and children (up to 21 years old).
              </p>
            </div>

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
                  <RelationAutocompleteField name='relation' />
                </div>
              </div>
            ))}

            <div className='form-add'>+ Add more relatives</div>
          </div>

          {/* Actions */}
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
                <span>Please wait...</span>
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default ProfileConfidentialForm
