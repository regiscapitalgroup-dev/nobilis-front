import React from 'react'
import {useUserProfileContext} from '../../../context/UserProfileContext'
import {useHistory} from 'react-router-dom'

export interface Member {
  id: string
  name: string
  avatar: string
  email: string
  memberSince: string
  plan: string
  assignedTo: string
  assignedToAvatar?: string
}

interface MembersTableProps {
  members: Member[]
  onRowClick?: (id: string) => void
}

export const ManageMemberGrid: React.FC<MembersTableProps> = ({members, onRowClick}) => {
  const {setSearchParams} = useUserProfileContext()
  const navigate = useHistory()

  const handleClickCell = (memberId: string) => {
    setSearchParams({userSelected: memberId})

    navigate.push('/member/overview')
  }

  return (
    <div className='members-table'>
      <div className='members-table__header-row'>
        <div className='members-table__header'>ID</div>
        <div className='members-table__header'>name</div>
        <div className='members-table__header'>Member since</div>
        <div className='members-table__header'>Plan</div>
        <div className='members-table__header'>assigned to</div>
      </div>

      {members.map((member) => (
        <div
          key={member.id}
          className='members-table__row'
          onClick={() => handleClickCell(member.id)}
        >
          <div className='members-table__cell'>{member.id}</div>
          <div className='members-table__cell'>
            <img src={member.avatar} alt={member.name} className='member-info__avatar' />
            <span className='member-info__name'>{member.name}</span>
          </div>
          <div className='members-table__cell'>{member.memberSince}</div>
          <div className='members-table__cell'>{member.plan}</div>
          <div className='members-table__cell'>
            <img
              src={member.assignedToAvatar || member.avatar}
              alt={member.assignedTo}
              className='member-info__avatar'
            />
            <span>{member.assignedTo}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
