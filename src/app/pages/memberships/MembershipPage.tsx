import {FC, useRef, useState, useEffect} from 'react'
import {MembershipWidget} from './components/MembershipWidget'
import {MembershipCreditsWidget} from './components/MembershipCreditsWidget'
import {MembershipDetailModel} from './models/MembershipModel'
import {useMemberships} from '../../hooks/membership/useMemberships'
import {useHistory} from 'react-router-dom'

const MembershipPage: FC = () => {
  const secondSecctionRef = useRef<HTMLDivElement>(null)
  const [membership, setMembership] = useState<MembershipDetailModel | null>(null)
  const {memberships, loading} = useMemberships()
  const navigate = useHistory()
  const handleMembershipSelected = (data: MembershipDetailModel | null) => setMembership(data)

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
    <>
      {memberships?.length > 0 && (
        <>
          <MembershipWidget
            memberships={memberships}
            loading={loading}
            handleMembershipSelected={handleMembershipSelected}
          />
          <MembershipCreditsWidget refToScroll={secondSecctionRef} />
        </>
      )}
    </>
  )
}

export {MembershipPage}
