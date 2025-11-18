import {FC, useRef, useState, useEffect} from 'react'
import {MembershipWidget} from './components/MembershipWidget'
import {MembershipCreditsWidget} from './components/MembershipCreditsWidget'
import {MembershipDetailModel} from './models/MembershipModel'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../setup'
import {useMemberships} from '../../hooks/membership/useMemberships'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {useHistory} from 'react-router-dom'

const MembershipPage: FC = () => {
  const secondSecctionRef = useRef<HTMLDivElement>(null)
  const [isActiveRequest, setIsActiveRequest] = useState<boolean>(false)
  const [membership, setMembership] = useState<MembershipDetailModel | null>(null)
  const {memberships, loading} = useMemberships(isActiveRequest)
  const {subscription} = useSelector((state: RootState) => state.auth, shallowEqual)
  const FIXED_BREAKPOINT = 545
  const scrollYRef = useRef(0)
  const navigate = useHistory()

  const handleSectionScroll = (e?: React.MouseEvent) => {
    if (e) e.preventDefault()
    setTimeout(() => {
      if (secondSecctionRef.current) {
        secondSecctionRef.current.scrollIntoView({behavior: 'smooth', block: 'start'})
      }
    }, 50)
  }

  const handleMembershipSelected = (data: MembershipDetailModel | null) => setMembership(data)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          scrollYRef.current = window.scrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, {passive: true})
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsActiveRequest(!subscription)
  }, [subscription])

  const getImageStyle = () => {
    const scrollY = scrollYRef.current

    if (scrollY <= FIXED_BREAKPOINT) {
      return {
        position: 'fixed' as const,
        top: `${FIXED_BREAKPOINT}px`,
        left: 0,
        width: '100%',
        height: '355px',
        zIndex: 0,
        transform: 'translateZ(0)',
      }
    } else {
      return {
        position: 'absolute' as const,
        top: `${FIXED_BREAKPOINT}px`,
        left: 0,
        width: '100%',
        height: '355px',
        zIndex: 0,
        transform: `translateY(${scrollY - FIXED_BREAKPOINT}px) translateZ(0)`,
      }
    }
  }

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({top: 0, behavior: 'smooth'})
    })
  }, [])

  useEffect(() => {
    if (membership) {
      navigate.push({
        pathname: '/membership/payment',
        state: {
          membership: membership,
        },
      })
    }
  }, [membership])

  return (
    <div className=''>
      <div className='membership-shell d-flex flex-column'>
        {membership == null && (
          <div aria-hidden='true' className='nb-membership-hero' style={getImageStyle()}>
            <img
              className='nb-membership-hero__img'
              src={toAbsoluteUrl('/media/login-room.png')}
              alt=''
              loading='eager'
              style={{
                /* width: '100%',
                height: '100%', */
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        )}

        <div
          /* className='d-flex flex-column' */
          style={{
            position: 'relative',
            zIndex: 1,
            /*  paddingBottom: '100px',
            minHeight: '100vh', */
          }}
        >
          <div>
            {Array.isArray(memberships) && memberships.length && (
              <>
                <MembershipWidget
                  memberships={memberships}
                  loading={loading}
                  handleScroll={handleSectionScroll}
                  handleMembershipSelected={handleMembershipSelected}
                />
                <div className='col-12 mt-10'>
                  <MembershipCreditsWidget refToScroll={secondSecctionRef} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export {MembershipPage}
