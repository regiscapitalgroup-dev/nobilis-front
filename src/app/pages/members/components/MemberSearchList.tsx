import {FC, useState} from 'react'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {useUserProfileContext} from '../../../context/UserProfileContext'
import {useHistory} from 'react-router-dom'

interface Member {
  id: string
  name: string
  badge: string
  categories: string[]
  description: string
  location: string
  image: string
}

interface MemberSearchListProps {
  data: Member[]
  loading: boolean
}

const MemberSearchList: FC<MemberSearchListProps> = ({data = [], loading}) => {
  const {setSearchParams} = useUserProfileContext()
  const [itemsToShow, setItemsToShow] = useState(16)
  const navigate = useHistory()

  if (loading) return <div className='members-page__no-results'>Loading...</div>
  if (!data?.length) return <div className='members-page__no-results'>No results found</div>

  const visibleMembers = data.slice(0, itemsToShow)
  const hasMore = data.length > itemsToShow

  return (
    <>
      <div className='members-page__members-list'>
        {data.map((member) => (
          <div
            key={member.id}
            className='members-page__member-card'
            onClick={() => {
              setSearchParams({userSelected: member.id})

              navigate.push('/member/overview')
            }}
          >
            <img
              src={toAbsoluteUrl(member.image)}
              alt={member.name}
              className='members-page__member-image'
            />

            {/* Overlay default */}
            <div className='members-page__member-overlay-default'>
              <div className='members-page__member-badge'>
                <svg
                  width='14'
                  height='1'
                  viewBox='0 0 14 1'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M0 0.25H13.5' stroke='white' stroke-width='0.5' />
                </svg>
                {member.badge}
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
              <div className='members-page__member-name'>{member.name}</div>
            </div>

            {/* Overlay hover */}
            <div className='members-page__member-overlay-hover'>
              <div>
                <div className='members-page__member-badge'>
                  <svg
                    width='14'
                    height='1'
                    viewBox='0 0 14 1'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M0 0.25H13.5' stroke='white' stroke-width='0.5' />
                  </svg>
                  {member.badge}
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
                <div className='members-page__member-name'>{member.name}</div>
                <div className='members-page__member-categories'>
                  {member.categories.map((cat, idx) => (
                    <div key={idx} className='members-page__member-category'>
                      {cat}
                    </div>
                  ))}
                </div>
              </div>
              <div className='members-page__member-description'>{member.description}</div>
              <div className='members-page__member-location'>
                <div className='members-page__member-location-icon'>
                  <svg
                    width='14'
                    height='14'
                    viewBox='0 0 14 14'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M7.00018 7.83334C8.00532 7.83334 8.82018 7.01854 8.82018 6.01334C8.82018 5.0082 8.00532 4.19336 7.00018 4.19336C5.99503 4.19336 5.18018 5.0082 5.18018 6.01334C5.18018 7.01854 5.99503 7.83334 7.00018 7.83334Z'
                      stroke='white'
                    />
                    <path
                      d='M2.11182 4.95185C3.26099 -0.0998163 10.7451 -0.0939823 11.8885 4.95768C12.5593 7.92102 10.716 10.4293 9.10015 11.981C7.92765 13.1127 6.07265 13.1127 4.89432 11.981C3.28432 10.4293 1.44099 7.91518 2.11182 4.95185Z'
                      stroke='white'
                    />
                  </svg>
                </div>
                <div className='members-page__member-location-text'>{member.location}</div>
              </div>
              <div className='members-page__member-learn-more'>
                <a
                  className='members-page__member-learn-more-text'
                  onClick={() => {
                    setSearchParams({userSelected: member.id})
                  }}
                >
                  Learn More
                </a>
                <svg
                  width='14'
                  height='4'
                  viewBox='0 0 14 4'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M8.5 0.378906L12 3.38306H0' stroke='white' />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '40px'}}>
          <button
            onClick={() => setItemsToShow(itemsToShow + 16)}
            style={{
              padding: '12px 32px',
              background: '#151515',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              fontFamily: 'Oswald, sans-serif',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
          >
            Load More
          </button>
        </div>
      )}
    </>
  )
}

export {MemberSearchList}
