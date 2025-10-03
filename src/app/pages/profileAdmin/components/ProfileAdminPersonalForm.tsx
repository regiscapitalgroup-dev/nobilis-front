import {FC} from 'react'
import {Formik, Form, Field} from 'formik'
import {KTSVG} from '../../../../_metronic/helpers'

const ProfileAdminPersonalForm: FC = () => {
  return (
    <div className='pf-personal'>
      <Formik
        initialValues={{
          hobbies: '',
          clubName: '',
          city: '',
          interests: [],
        }}
        onSubmit={(values) => {
          console.log('Form submit', values)
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
                  <Field name='hobbies' className='pf-personal__input' placeholder='Singing' />
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
                    <Field
                      name='clubName'
                      className='pf-personal__input'
                      placeholder='e.g. Chess Club'
                    />
                  </div>
                  <div className='pf-personal__field'>
                    <label className='pf-personal__label'>City</label>
                    <Field name='city' className='pf-personal__input' placeholder='e.g. New York' />
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
                  {[
                    'Building Relationships',
                    'Continuous Learning',
                    'Art/Music/Craft Creation',
                    'Family',
                    'Health and Wellness',
                    'Spiritual Growth',
                    'World Exploration',
                    'Nature',
                  ].map((interest) => (
                    <label
                      key={interest}
                      className={`pf-personal__tag ${
                        ['Family', 'Spiritual Growth'].includes(interest)
                          ? 'pf-personal__tag--selected'
                          : ''
                      }`}
                    >
                      {interest}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className='pf-personal__actions'>
              <button type='button' className='pf-personal__btn pf-personal__btn--secondary'>
                Cancel
              </button>
              <button type='submit' className='pf-personal__btn pf-personal__btn--primary'>
                Save changes
                <img
                  src='/media/svg/nobilis/vector1.svg'
                  alt=''
                  className='nb-btn-icon nb-btn-icon--white'
                />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ProfileAdminPersonalForm
