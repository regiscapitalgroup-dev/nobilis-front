import React, {useState, useEffect} from 'react'
import {useSelector, shallowEqual} from 'react-redux'
import {RootState} from '../../../../../setup'
import {useUserProfileContext} from '../../../../../app/context/UserProfileContext'
import { UserModel } from '../../../../../app/modules/auth/models/UserModel'

const PLACEHOLDER_IMAGE = 'https://placehold.co/18x18'

export function AdminHeaderAvatar() {
  const loggedUser = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  const {data, searchParams} = useUserProfileContext()
  const [cacheKey, setCacheKey] = useState(() => Date.now())

  const profilePicture = searchParams.userSelected 
    ? loggedUser.profilePicture 
    : data?.profilePicture

  useEffect(() => {
    if (profilePicture) {
      setCacheKey(Date.now())
    }
  }, [profilePicture])

  const avatarSrc = profilePicture
    ? `${profilePicture}?t=${cacheKey}`
    : PLACEHOLDER_IMAGE

  return (
    <div className='nb-admin-header__avatar'>
      <img src={avatarSrc} alt='User avatar' className='nb-admin-header__avatar-img' />
    </div>
  )
}