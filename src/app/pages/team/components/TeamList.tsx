import {FC} from 'react'
import {TeamModel} from '../models/TeamModel'
import {KTSVG} from '../../../../_metronic/helpers'

interface Props {
  members: TeamModel[]
  onAdd: () => void
  onEdit: (id: string) => void
  onArchive: (id: string) => void
}

const TeamList: FC<Props> = ({members, onAdd, onEdit, onArchive}) => {
  return (
    <div className='team-list'>
      <div className='team-list__container'>
        <div className='team-list__header'>
          <h2 className='team-list__title'>My Team</h2>
          <p className='team-list__subtitle'>
          You can manage your Nobilis profile personally or invite trusted individuals—such as personal assistants, agents, or activity coordinators—to help. Assign them specific responsibilities like updating your profile, managing experiences, or handling requests.
          <br />
          Each team member will receive their own login with limited platform access—they will only see and manage the tasks you’ve assigned to them. Their profiles will remain hidden from other members, and you maintain full control over your account and visibility.
          </p>
          
        </div>

        {members.length === 0 ? (
          <>
            <p className='team-list__empty-text'>You have no team members yet, add them now</p>
            <button className='team-list__btn team-list__btn--primary' onClick={onAdd}>
              <span>add manager</span>
              <img
                src='/media/svg/nobilis/vector1.svg'
                alt=''
                className='nb-btn-icon nb-btn-icon--white'
              />
            </button>
          </>
        ) : (
          <>
            <div className='team-list__actions-header'>
              <button className='team-list__btn team-list__btn--primary' onClick={onAdd}>
                <span>add manager</span>
                <img
                  src='/media/svg/nobilis/vector1.svg'
                  alt=''
                  className='nb-btn-icon nb-btn-icon--white'
                />
              </button>
            </div>

            <div className='team-list__content'>
              {members.map((member) => (
                <div key={member.id} className='team-list__card'>
                  <div className='team-list__card-header'>
                    <div>
                      <div className='team-list__name'>
                        {member.name} {member.surname}
                      </div>
                      <div className='team-list__details'>
                        <span>{member.email}</span>|<span>{member.phone}</span>|
                        <span>{member.relation}</span>|<span>{member.organization}</span>
                      </div>
                    </div>

                    {/* Switch de estado */}
                    <div
                      className={`team-list__status-switch ${
                        member.active ? 'active' : 'inactive'
                      }`}
                    >
                      <div className='team-list__status-knob'></div>
                    </div>
                  </div>
                  <div className='team-list__divider'></div>
                  <div className='team-list__card-footer'>
                    <div className='team-list__assignments'>
                      Assignment: {member.assignments.join(', ')}
                    </div>
                    <div className='team-list__actions'>
                      <a onClick={() => onEdit(member.id)} className='cursor-pointer'>
                        <KTSVG path='/media/svg/nobilis/edit-item.svg' />
                      </a>
                      <a onClick={() => onArchive(member.id)} className='cursor-pointer'>
                        <KTSVG path='/media/svg/nobilis/remove-item.svg' />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default TeamList
