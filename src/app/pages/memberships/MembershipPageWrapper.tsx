import {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {MembershipPage} from './MembershipPage'

const MembershipPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Memberships</PageTitle>
      <MembershipPage />
    </>
  )
}

export default MembershipPageWrapper
