import React, {useState} from 'react'
import {ManageMemberGrid, Member} from './components/ManageMemberGrid'
import Pagination from '../components/Pagination'
import {ManageMemberStats} from './components/ManageMemberStats'
import {ManageMemberSearch} from './components/ManageMemberSearch'
import {ManageMemberTabNavigation} from './components/ManageMemberTabNavigation'
import {useSearchableManageMembers} from '../../hooks/manageMembers/useSearchableManageMembers'
import {ApiMember} from './models/ManageMemberModel'

export const ManageMemberPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('members')
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)

  const {data} = useSearchableManageMembers(searchQuery, activeTab)

  const tabs: any[] = [
    {id: 'members', label: 'Members'},
    {id: 'new-members', label: 'New Members'},
    {id: 'create-profile', label: 'Create Profile', badge: 2},
  ]

  const transformMember = (apiMember: ApiMember): Member => ({
    id: String(apiMember.id),
    name: `${apiMember.firstName} ${apiMember.lastName}`.trim(),
    avatar: apiMember.profilePicture,
    email: apiMember.email,
    memberSince: apiMember.memberSince,
    plan: apiMember.planName,
    assignedTo: apiMember.assignedTo?.name || 'Unassigned',
    assignedToAvatar: apiMember.assignedTo?.profilePicture,
  })

  const members = data?.results?.map(transformMember) || []

  const electiCount =
    data?.stats.plansBreakdown.find((p) =>
      p.profile_CurrentSubscription_Plan_Title?.toLowerCase().includes('electi')
    )?.count || 0

  const totalPages = data?.count ? Math.ceil(data.count / 15) : 1

  return (
    <div className='manage-member-page'>
      <h1 className='manage-member-page__title'>Manage Members</h1>

      <div className='manage-member-page__content'>
        <div className='manage-member-page__tabs' style={{width: '100%'}}>
          <ManageMemberTabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onCreateRecord={() => console.log('clicked')}
          />
        </div>

        <div className='manage-member-page__search'>
          <ManageMemberSearch value={searchQuery} onChange={setSearchQuery} />
        </div>

        {data?.stats && (
          <div className='manage-member-page__stats'>
            <ManageMemberStats
              totalMembers={data.stats.totalMembers}
              activeMembers={data.stats.activeMembers}
              electiMembers={electiCount}
              newMembers={data.stats.newMembers}
            />
          </div>
        )}

        <div className='manage-member-page__table'>
          <ManageMemberGrid members={members} />
        </div>

        <div className='manage-member-page__pagination'>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  )
}
