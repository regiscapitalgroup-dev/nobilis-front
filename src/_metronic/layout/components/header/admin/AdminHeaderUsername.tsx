import React from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../../../setup'
import {UserModel} from '../../../../../app/modules/auth/models/UserModel'
import {useUserProfileContext} from '../../../../../app/context/UserProfileContext'

export function AdminHeaderUsername() {
  const loggedUser = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  const {data, searchParams} = useUserProfileContext()

  const loggedUserFullName = `${loggedUser.firstName || ''} ${loggedUser.lastName || ''}`.trim()
  const contextFullName = `${data?.firstName || ''} ${data?.surname || ''}`.trim()

  return (
    <span className='nb-admin-header__username'>
      {searchParams.userSelected ? loggedUserFullName : contextFullName}
    </span>
  )
}
