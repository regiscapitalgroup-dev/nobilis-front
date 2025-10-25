import React from 'react'
import {AsideMenuItem} from './AsideMenuItem'
import {AsideUserCard} from './AsideUserCard'

export function AsideMenuMain() {
  return (
    <div className='nb-aside-menu'>
      <div className='nb-aside-content'>
        {/* MY ACCOUNT Section */}
        <div className='nb-menu-section'>
          <div className='nb-menu-section-header'>
            <span className='nb-menu-section-title'>Review</span>
          </div>
          <div className='nb-menu-section-content'>
            <AsideMenuItem
              to='/waitinglist'
              title='users waitlist'
              showIcon={true}
              isSelected={false}
              icon='/media/svg/nobilis/user_nb.svg'
            />
          </div>
        </div>
        <div className='nb-menu-section'>
          <div className='nb-menu-section-header'>
            <span className='nb-menu-section-title'>MY ACCOUNT</span>
          </div>
          <div className='nb-menu-section-content'>
            <AsideMenuItem
              to='/admin/overview/profile'
              title='MY PROFILE'
              showIcon={true}
              isSelected={false}
              icon='/media/svg/nobilis/user_nb.svg'
            />
            {/* <AsideMenuItem
              to='/team'
              title='MY TEAM'
              showIcon={true}
              isSelected={false}
              icon='/media/svg/nobilis/team_nb.svg'
            />
            <AsideMenuItem
              to='/references'
              title='REFER A MEMBER'
              showIcon={true}
              isSelected={false}
              icon='/media/svg/nobilis/ref_member_nb.svg'
            /> */}
          </div>
        </div>

        {/* Separator */}
        {/* <div className='nb-menu-separator'></div> */}

        {/* MY HOSTING Section */}
        {/* <div className='nb-menu-section'>
          <div className='nb-menu-section-header'>
            <span className='nb-menu-section-title'>MY HOSTING</span>
          </div>
          <div className='nb-menu-section-content'>
            <AsideMenuItem
              to='/experiences'
              title='MY EXPERIENCES'
              showIcon={true}
              showBadge={true}
              isSelected={false}
              icon='/media/svg/nobilis/exp_nb.svg'
            />
            <AsideMenuItem
              to='/dashboard'
              title='MY INTRODUCTIONS'
              showIcon={true}
              showBadge={true}
              isSelected={false}
              icon='/media/svg/nobilis/intro_nb.svg'
            />
            <AsideMenuItem
              to='/dashboard'
              title='MY EXPERTISE'
              showIcon={true}
              showBadge={true}
              isSelected={false}
              icon='/media/svg/nobilis/expert_nb.svg'
            />
            <AsideMenuItem
              to='/dashboard'
              title='MY MASTERMIND CIRCLES'
              showIcon={true}
              showBadge={true}
              isSelected={false}
              icon='/media/svg/nobilis/mem_cir_nb.svg'
            />
          </div>
        </div> */}

        {/* Separator */}
        {/* <div className='nb-menu-separator'></div> */}

        {/* ACTIVITY Section */}
        {/* <div className='nb-menu-section'>
          <div className='nb-menu-section-header'>
            <span className='nb-menu-section-title'>ACTIVITY</span>
          </div>
          <div className='nb-menu-section-content'>
            <AsideMenuItem
              to='/dashboard'
              title='MY BOOKING'
              showIcon={true}
              isSelected={false}
              icon='/media/svg/nobilis/master_nb.svg'
            />
            <AsideMenuItem
              to='/dashboard'
              title='INVITATIONS'
              showIcon={true}
              showBadge={true}
              isSelected={false}
              icon='/media/svg/nobilis/book_nb.svg'
            />
            <AsideMenuItem
              to='/dashboard'
              title='WISHLIST'
              showIcon={true}
              isSelected={false}
              icon='/media/svg/nobilis/invitation_nb.svg'
            />
          </div>
        </div> */}

        {/* Separator */}
        {/* <div className='nb-menu-separator'></div>
 */}
        {/* MEMBERSHIP & FINANCE Section */}
        {/* <div className='nb-menu-section'>
          <div className='nb-menu-section-header'>
            <span className='nb-menu-section-title'>MEMBERSHIP & FINANCE</span>
          </div>
          <div className='nb-menu-section-content'>
            <AsideMenuItem
              to='/dashboard'
              title='MY MEMBERSHIP'
              showIcon={true}
              isSelected={false}
              icon='/media/svg/nobilis/wis_nb.svg'
            />
            <AsideMenuItem
              to='/dashboard'
              title='PAYMENTS'
              showIcon={true}
              isSelected={false}
              icon='/media/svg/nobilis/member_nb.svg'
            />
            <AsideMenuItem
              to='/dashboard'
              title='FINANCIAL OVERVIEW'
              showIcon={true}
              isSelected={false}
              icon='/media/svg/nobilis/payment_nb.svg'
            />
          </div>
        </div> */}
      </div>

      {/* User Card at the bottom */}
      {/* <div className='nb-menu-user-card'>
        <AsideUserCard />
      </div> */}
    </div>
  )
}
