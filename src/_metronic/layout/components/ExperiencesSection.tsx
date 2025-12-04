// ExperiencesSection.tsx - SIMPLIFICADO SIN CAROUSEL
import React, {FC} from 'react'
import {KTSVG} from '../../helpers'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../setup'
import {UserModel} from '../../../app/modules/auth/models/UserModel'

const mockExperiences = [
  {
    id: 1,
    experiencePhotograph: 'https://placehold.co/400x420',
    title: 'Sailing Experience Through One Of The Most Beautiful River In Lithuania',
    description:
      'Make a painting together with Kristina at her studio - be an artist. Invited people who want to learn to paint or make a painting together for the interior.',
    isNew: true,
    categories: ['lifestyle', 'adventure', 'nature'],
    location: 'Vilnius, Lithuania',
    date: 'On Request',
    price: 'USD 2000/Guest',
    authors: [
      {name: 'John Capwell', photoUrl: 'https://placehold.co/18x18'},
      {name: 'Maria Smith', photoUrl: 'https://placehold.co/18x18'},
    ],
  },
  {
    id: 2,
    experiencePhotograph: 'https://placehold.co/400x420',
    title: 'Harvesting Experience at a Secluded Organic Estate in the French Countryside',
    description:
      'Join us for an authentic harvesting experience in the heart of French wine country.',
    isNew: true,
    categories: ['lifestyle', 'food', 'nature'],
    location: 'Provence, France',
    date: 'September 2025',
    price: 'USD 3000/Guest',
    authors: [{name: 'Sophie Laurent', photoUrl: 'https://placehold.co/18x18'}],
  },
  {
    id: 3,
    experiencePhotograph: 'https://placehold.co/400x420',
    title: 'Hands-On Cooking Experience in a Private Villa Overlooking the Amalfi Coast',
    description:
      'Learn authentic Italian cuisine from a master chef in a stunning coastal setting.',
    isNew: false,
    categories: ['culinary', 'lifestyle', 'culture'],
    location: 'Amalfi, Italy',
    date: 'Available Year-Round',
    price: 'USD 2500/Guest',
    authors: [
      {name: 'Marco Rossi', photoUrl: 'https://placehold.co/18x18'},
      {name: 'Anna Bianchi', photoUrl: 'https://placehold.co/18x18'},
    ],
  },
  {
    id: 4,
    experiencePhotograph: 'https://placehold.co/400x420',
    title: 'Private Yacht Experience in Monaco Harbor',
    description:
      'Experience luxury sailing along the French Riviera with champagne and gourmet cuisine.',
    isNew: true,
    categories: ['luxury', 'sailing', 'lifestyle'],
    location: 'Monaco',
    date: 'Summer 2025',
    price: 'USD 5000/Guest',
    authors: [{name: 'Jean Pierre', photoUrl: 'https://placehold.co/18x18'}],
  },
  {
    id: 5,
    experiencePhotograph: 'https://placehold.co/400x420',
    title: 'Painting Experience Amid the Rolling Hills of Tuscany',
    description: 'Create your own masterpiece under the guidance of a renowned artist.',
    isNew: false,
    categories: ['art', 'lifestyle', 'culture'],
    location: 'Tuscany, Italy',
    date: 'Spring 2025',
    price: 'USD 1800/Guest',
    authors: [
      {name: 'Kristina Art', photoUrl: 'https://placehold.co/18x18'},
      {name: 'David Stone', photoUrl: 'https://placehold.co/18x18'},
      {name: 'Emma White', photoUrl: 'https://placehold.co/18x18'},
    ],
  },
]

const ExperiencesSection: FC = () => {
  const data = mockExperiences
  const user = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  const fullName = `${user.firstName} ${user.lastName}`

  return (
    <div className='experiencesWrapper'>
      <div className='backgroundDecoration'>
        <KTSVG path='/media/svg/nobilis/mark_bg.svg' className='svg-icon-2' />
      </div>

      <div className='experiencesContainer'>
        {/* Header */}
        <div className='experiencesHeader'>
          <div className='experiencesHeaderContent'>
            <div className='experiencesTitle'>{fullName}</div>
            <div className='experiencesSubtitle'>Invites You</div>
          </div>
        </div>

        {/* Separador */}
        <div className='experiencesSeparator' />

        {/* Experiences Grid - Scroll Horizontal */}
        <div className='experiencesGrid'>
          {data.map((experience) => (
            <div key={experience.id} className='experienceCard'>
              {/* Image Container */}
              <div className='experienceImageContainer'>
                <img
                  className='experienceImage'
                  src={experience.experiencePhotograph}
                  alt={experience.title}
                />
              </div>

              {/* Overlay Content - Default */}
              <div className='experienceOverlay'>
                {/* Badge */}
                {experience.isNew && (
                  <div className='experienceBadge'>
                    <svg
                      width='14'
                      height='1'
                      viewBox='0 0 14 1'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M0 0.25H13.5' stroke='white' stroke-width='0.5' />
                    </svg>

                    <div className='experienceBadgeText'>New</div>
                    <svg
                      width='14'
                      height='1'
                      viewBox='0 0 14 1'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M0 0.25H13.5' stroke='white' stroke-width='0.5' />
                    </svg>
                  </div>
                )}

                {/* Invited by label */}
                <div className='experienceInvitedBy'>
                  <div className='experienceInvitedByText'>invited by</div>
                </div>

                {/* Authors */}
                <div className='experienceAuthors'>
                  {experience.authors.map((author, index) => (
                    <React.Fragment key={index}>
                      <div className='experienceAuthor'>
                        <img
                          className='experienceAuthorAvatar'
                          src={author.photoUrl}
                          alt={author.name}
                        />
                        <div className='experienceAuthorName'>{author.name}</div>
                      </div>
                      {index < experience.authors.length - 1 && (
                        <svg width='1' height='14' viewBox='0 0 1 14' fill='none'>
                          <path d='M0.5 0V13.5' stroke='#808080' />
                        </svg>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Title */}
                <div className='experienceTitle'>{experience.title}</div>
              </div>

              {/* Hover Overlay - Expanded Info */}
              <div className='experienceHoverOverlay'>
                {/* Invited by label */}
                <div className='experienceHoverInvitedBy'>
                  <div className='experienceHoverInvitedByText'>invited by</div>
                </div>

                {/* Authors */}
                <div className='experienceHoverAuthors'>
                  {experience.authors.map((author, index) => (
                    <React.Fragment key={index}>
                      <div className='experienceHoverAuthor'>
                        <img
                          className='experienceHoverAuthorAvatar'
                          src={author.photoUrl}
                          alt={author.name}
                        />
                        <div className='experienceHoverAuthorName'>{author.name}</div>
                      </div>
                      {index < experience.authors.length - 1 && (
                        <svg width='1' height='14' viewBox='0 0 1 14' fill='none'>
                          <path d='M0.5 0V13.5' stroke='#808080' />
                        </svg>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Title */}
                <div className='experienceHoverTitle'>{experience.title}</div>

                {/* Categories */}
                <div className='experienceCategories'>
                  {experience.categories.map((category, index) => (
                    <div key={index} className='experienceCategoryTag'>
                      {category}
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div className='experienceDescription'>{experience.description}</div>

                {/* Info Row */}
                <div className='experienceInfoRow'>
                  <div className='experienceInfoItem'>
                    <KTSVG path='/media/svg/nobilis/location_mark.svg' />
                    <div className='experienceInfoText'>{experience.location}</div>
                  </div>
                  <div className='experienceInfoItem'>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 14 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M4.6665 1.16699V2.91699'
                        stroke='white'
                        stroke-miterlimit='10'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M9.3335 1.16699V2.91699'
                        stroke='white'
                        stroke-miterlimit='10'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M2.0415 5.30273H11.9582'
                        stroke='white'
                        stroke-miterlimit='10'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M12.25 4.95866V9.91699C12.25 11.667 11.375 12.8337 9.33333 12.8337H4.66667C2.625 12.8337 1.75 11.667 1.75 9.91699V4.95866C1.75 3.20866 2.625 2.04199 4.66667 2.04199H9.33333C11.375 2.04199 12.25 3.20866 12.25 4.95866Z'
                        stroke='white'
                        stroke-miterlimit='10'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M9.15527 7.99121H9.16052'
                        stroke='white'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M9.15527 9.74121H9.16052'
                        stroke='white'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M6.99756 7.99121H7.00281'
                        stroke='white'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M6.99756 9.74121H7.00281'
                        stroke='white'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M4.83838 7.99121H4.84362'
                        stroke='white'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M4.83838 9.74121H4.84362'
                        stroke='white'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                    <div className='experienceInfoText'>{experience.date}</div>
                  </div>
                  <div className='experienceInfoItem'>
                    {/* <KTSVG path='/media/icons/duotune/finance/fin006.svg' /> */}
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 14 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M5.05859 8.35873C5.05859 9.11123 5.63609 9.71789 6.35361 9.71789H7.81777C8.44194 9.71789 8.94944 9.18706 8.94944 8.53373C8.94944 7.82206 8.64027 7.57123 8.17944 7.40789L5.82859 6.59123C5.36775 6.42789 5.05859 6.17706 5.05859 5.46542C5.05859 4.81208 5.56609 4.28125 6.19027 4.28125H7.65444C8.37194 4.28125 8.94944 4.88792 8.94944 5.64042'
                        stroke='white'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M7 3.5V10.5'
                        stroke='white'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M6.99984 12.8337C10.2215 12.8337 12.8332 10.222 12.8332 7.00032C12.8332 3.77866 10.2215 1.16699 6.99984 1.16699C3.77817 1.16699 1.1665 3.77866 1.1665 7.00032C1.1665 10.222 3.77817 12.8337 6.99984 12.8337Z'
                        stroke='white'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>

                    <div className='experienceInfoText'>{experience.price}</div>
                  </div>
                </div>

                {/* Learn More Button */}
                <div className='experienceLearnMore'>
                  <div className='experienceLearnMoreText'>Learn More</div>
                  <svg
                    width='14'
                    height='4'
                    viewBox='0 0 14 4'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M8.5 0.379883L12 3.38403H0' stroke='white' />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export {ExperiencesSection}
