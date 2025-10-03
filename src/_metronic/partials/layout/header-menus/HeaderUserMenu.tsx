/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {UserModel} from '../../../../app/modules/auth/models/UserModel'
import {RootState} from '../../../../setup'
import { KTSVG } from '../../../helpers'

const HeaderUserMenu: FC = () => {
  const user: UserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel

  console.log(user)
  
  return (
    <div
      className='menu menu-sub menu-sub-dropdown custom-user-menu'
      data-kt-menu='true'
    >
      {/* UPGRADE SECTION */}
      <div className='custom-user-menu__upgrade'>
        <div className='custom-user-menu__upgrade-text'>Upgrade to Electi ∞</div>
        <div className='custom-user-menu__upgrade-price'>$ 5.000 + 20.000 Credits</div>
      </div>

      {/* MY PROFILE */}
      <Link to='/admin/overview' className='custom-user-menu__item custom-user-menu__item--profile'>
        <div className='custom-user-menu__icon'>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="6.67" r="3.67" stroke="white" strokeWidth="1"/>
            <path d="M3.18 15.83C3.18 12.79 6.24 10.33 10 10.33C13.76 10.33 16.82 12.79 16.82 15.83" stroke="white" strokeWidth="1"/>
          </svg>
        </div>
        <span className='custom-user-menu__text'>MY PROFILE</span>
      </Link>

      {/* MESSAGES */}
      <div className='custom-user-menu__item'>
        <div className='custom-user-menu__icon'>
        <KTSVG path={'/media/svg/nobilis/message.svg'}  />
        </div>
        <span className='custom-user-menu__text custom-user-menu__text--dark'>MESSAGES</span>
      </div>

      {/* CHANGE PASSWORD */}
      <div className='custom-user-menu__item'>
        <div className='custom-user-menu__icon'>
        <KTSVG path={'/media/svg/nobilis/change_pass.svg'}  />
        </div>
        <span className='custom-user-menu__text custom-user-menu__text--dark'>CHANGE PASSWORD</span>
      </div>

      {/* LOGOUT */}
      <Link to='/logout' className='custom-user-menu__item'>
        <div className='custom-user-menu__icon'>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.92 2.57H17.42V17.44H7.92" stroke="#A50F0F" strokeWidth="1"/>
            <path d="M2.58 7.71H12.79" stroke="#A50F0F" strokeWidth="1"/>
            <path d="M10 5L12.79 7.71L10 10.42" stroke="#A50F0F" strokeWidth="1"/>
          </svg>
        </div>
        <span className='custom-user-menu__text custom-user-menu__text--logout'>LOGOUT</span>
      </Link>
    </div>
  )
}

export {HeaderUserMenu}