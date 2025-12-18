import {AsideMenuItem} from './AsideMenuItem'
import {UserModel} from '../../../../app/modules/auth/models/UserModel'
import {RootState} from '../../../../setup/redux/RootReducer'
import {shallowEqual, useSelector} from 'react-redux'
import {hasPermission} from '../../../../app/utils/permissions'
import {Permission} from '../../../../app/constants/roles'

export function AsideMenuMain() {
  const user = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  const canWaitList = hasPermission(user, Permission.SEE_MENU_ITEM_WL)
  const canMenuMyHost = hasPermission(user, Permission.MY_HOSTING)
  const canManageMember = hasPermission(user, Permission.MANAGE_MEMBER)

  return (
    <div className='nb-aside-menu'>
      <div className='nb-aside-content'>
        {/* REVIEW Section - Solo para waitlist users */}
        {canWaitList && (
          <div className='nb-menu-section'>
            <div className='nb-menu-section-header'>
              <span className='nb-menu-section-title'>Review</span>
            </div>
            <div className='nb-menu-section-content'>
              <AsideMenuItem
                to='/waitinglist'
                title='users waitlist'
                showIcon={true}
                icon='/media/svg/nobilis/user_nb.svg'
              />
            </div>
          </div>
        )}

        {/* MY ACCOUNT Section - Para usuarios normales */}
        {!canWaitList && (
          <>
            <div className='nb-menu-section'>
              <div className='nb-menu-section-header'>
                <span className='nb-menu-section-title'>MY ACCOUNT</span>
              </div>
              <div className='nb-menu-section-content'>
                <AsideMenuItem
                  to='/admin/overview/profile'
                  title='MY PROFILE'
                  showIcon={true}
                  icon='/media/svg/nobilis/user_nb.svg'
                />
                <AsideMenuItem
                  to='/biography'
                  title='MY BIOGRAPHY'
                  showIcon={true}
                  icon='/media/svg/nobilis/user_nb.svg'
                />
                {canManageMember && (
                  <AsideMenuItem
                    to='/manage-members'
                    title='MANAGE MEMBER'
                    showIcon={true}
                    icon='/media/svg/nobilis/user_nb.svg'
                  />
                )}
                {/* <AsideMenuItem
                  to='/team'
                  title='MY TEAM'
                  showIcon={true}
                  icon='/media/svg/nobilis/team_nb.svg'
                />
                <AsideMenuItem
                  to='/references'
                  title='REFER A MEMBER'
                  showIcon={true}
                  icon='/media/svg/nobilis/ref_member_nb.svg'
                /> */}
              </div>
            </div>

            {/*  <div className='nb-menu-separator'></div>

            <div className='nb-menu-section'>
              <div className='nb-menu-section-header'>
                <span className='nb-menu-section-title'>MY HOSTINGS</span>
              </div>
              <div className='nb-menu-section-content'>
                <AsideMenuItem
                  to='/experiences'
                  title='MY EXPERIENCES'
                  showIcon={true}
                  showBadge={true}
                  badgeCount={2}
                  icon='/media/svg/nobilis/exp_nb.svg'
                />
                <AsideMenuItem
                  to='/introductions'
                  title='MY INTRODUCTIONS'
                  showIcon={true}
                  showBadge={true}
                  badgeCount={2}
                  icon='/media/svg/nobilis/intro_nb.svg'
                />
                <AsideMenuItem
                  to='/expertise'
                  title='MY EXPERTISE'
                  showIcon={true}
                  showBadge={true}
                  badgeCount={2}
                  icon='/media/svg/nobilis/expert_nb.svg'
                />
                <AsideMenuItem
                  to='/mastermind'
                  title='MY MASTERMIND CIRCLES'
                  showIcon={true}
                  showBadge={true}
                  badgeCount={2}
                  icon='/media/svg/nobilis/mem_cir_nb.svg'
                />
              </div>
            </div>

            <div className='nb-menu-separator'></div>

            <div className='nb-menu-section'>
              <div className='nb-menu-section-header'>
                <span className='nb-menu-section-title'>MY ACTIVITY</span>
              </div>
              <div className='nb-menu-section-content'>
                <AsideMenuItem
                  to='/bookings'
                  title='MY BOOKINGS'
                  showIcon={true}
                  icon='/media/svg/nobilis/master_nb.svg'
                />
                <AsideMenuItem
                  to='/invitations'
                  title='INVITATIONS'
                  showIcon={true}
                  showBadge={true}
                  badgeCount={2}
                  icon='/media/svg/nobilis/book_nb.svg'
                />
                <AsideMenuItem
                  to='/wishlist'
                  title='WISHLIST'
                  showIcon={true}
                  icon='/media/svg/nobilis/invitation_nb.svg'
                />
              </div>
            </div>

            <div className='nb-menu-separator'></div>

            <div className='nb-menu-section'>
              <div className='nb-menu-section-header'>
                <span className='nb-menu-section-title'>MEMBERSHIP & FINANCE</span>
              </div>
              <div className='nb-menu-section-content'>
                <AsideMenuItem
                  to='/membership'
                  title='MY MEMBERSHIP'
                  showIcon={true}
                  icon='/media/svg/nobilis/wis_nb.svg'
                />
                <AsideMenuItem
                  to='/payments'
                  title='PAYMENTS'
                  showIcon={true}
                  icon='/media/svg/nobilis/member_nb.svg'
                />
                <AsideMenuItem
                  to='/financial'
                  title='FINANCIAL OVERVIEW'
                  showIcon={true}
                  icon='/media/svg/nobilis/payment_nb.svg'
                />
              </div>
            </div> */}
          </>
        )}

        {/* Profile partner y team */}
        {canMenuMyHost && (
          <div className='nb-menu-section'>
            <div className='nb-menu-section-header'>
              <span className='nb-menu-section-title'>MY HOSTINGS</span>
            </div>
            <div className='nb-menu-section-content'>
              <AsideMenuItem to='/my-experience' title='My Experience' showIcon={true} icon='/media/svg/nobilis/menu_my_experiences.svg'/>
              <AsideMenuItem to='/host-experience' title='Host Experience' showIcon={true} icon='/media/svg/nobilis/menu_my_experiences.svg'/>
              <AsideMenuItem to='/experience/admin' title='Experiences' showIcon={true} icon='/media/svg/nobilis/user_nb.svg'/>
            </div>
            <div className='nb-menu-section-header'>
              <span className='nb-menu-section-title'>Members Account</span>
            </div>
            <div className='nb-menu-section-content'>
              <AsideMenuItem to='/partner/my-experiences' title='My Experiences' showIcon={true} icon='/media/svg/nobilis/exp_nb.svg'/>
              {/* <AsideMenuItem to='/team/admin' title='Team' showIcon={true} icon='/media/svg/nobilis/user_nb.svg'/> */}
            </div>
          </div>
        )}
      </div>

      {/* User Card at the bottom - Comentado según el código original */}
      {/* <div className='nb-menu-user-card'>
        <AsideUserCard />
      </div> */}
    </div>
  )
}
