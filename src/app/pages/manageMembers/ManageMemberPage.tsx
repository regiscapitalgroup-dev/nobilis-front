import React, {useState} from 'react'
import {ManageMemberGrid} from './components/ManageMemberGrid'
import Pagination from '../components/Pagination'
import {ManageMemberStats} from './components/ManageMemberStats'
import {ManageMemberSearch} from './components/ManageMemberSearch'
import {ManageMemberTabNavigation} from './components/ManageMemberTabNavigation'
import {useSearchableMembersContext} from '../../context/SearchableMembersContext'

export const ManageMemberPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('members')
  const {data: members, loading: membersLoading} = useSearchableMembersContext()

  console.log('MEMBERS', members)

  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const tabs: any[] = [
    {id: 'members', label: 'Members'},
    {id: 'new-members', label: 'New Members'},
    {id: 'create-profile', label: 'Create Profile', badge: 2},
  ]

  const mockMembers: any[] = [
    {
      id: '#1234',
      name: 'Kristina Adam',
      avatar: 'https://placehold.co/28x28',
      email: 'john@email.com',
      memberSince: '12 July 2025',
      plan: 'Electi',
      assignedTo: 'Admin Name',
    },
    {
      id: '#1234',
      name: 'Kristina Adam',
      avatar: 'https://placehold.co/28x28',
      email: 'john@email.com',
      memberSince: '12 July 2025',
      plan: 'Electi ∞',
      assignedTo: 'Admin Name',
    },
    {
      id: '#1234',
      name: 'Kristina Adam',
      avatar: 'https://placehold.co/28x28',
      email: 'john@email.com',
      memberSince: '12 July 2025',
      plan: 'Inactive',
      assignedTo: 'Admin Name',
    },
    {
      id: '#1234',
      name: 'Kristina Adam',
      avatar: 'https://placehold.co/28x28',
      email: 'john@email.com',
      memberSince: '12 July 2025',
      plan: 'Inactive',
      assignedTo: 'Admin Name',
    },
    {
      id: '#1234',
      name: 'Kristina Adam',
      avatar: 'https://placehold.co/28x28',
      email: 'john@email.com',
      memberSince: '12 July 2025',
      plan: 'Electi',
      assignedTo: 'Admin Name',
    },
    {
      id: '#1234',
      name: 'Kristina Adam',
      avatar: 'https://placehold.co/28x28',
      email: 'john@email.com',
      memberSince: '12 July 2025',
      plan: 'Electi ∞',
      assignedTo: 'Admin Name',
    },
    {
      id: '#1234',
      name: 'Kristina Adam',
      avatar: 'https://placehold.co/28x28',
      email: 'john@email.com',
      memberSince: '12 July 2025',
      plan: 'Electi ∞',
      assignedTo: 'Admin Name',
    },
  ]

  const totalPages = 12

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

        <div className='manage-member-page__stats'>
          <ManageMemberStats
            totalMembers={200000}
            activeMembers={180000}
            electiMembers={120000}
            newMembers={300}
          />
        </div>

        <div className='manage-member-page__table'>
          <ManageMemberGrid members={mockMembers} />
        </div>

        <div className='manage-member-page__pagination'>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  )
}
