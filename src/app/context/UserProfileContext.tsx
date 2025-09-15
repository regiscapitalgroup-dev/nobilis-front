// context/UserProfileContext.tsx
import {createContext, useContext} from 'react'
import {useUserProfile} from '../hooks/profile/useProfile'
import {FullUserProfileModel} from '../pages/biography/models/FullUserProfileModel'

interface UserProfileState {
  data?: FullUserProfileModel | null
  loading: boolean
  error?: Error | null
}

const UserProfileContext = createContext<UserProfileState | undefined>(undefined)

export const UserProfileProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {data, error, loading} = useUserProfile()

  return (
    <UserProfileContext.Provider value={{data, loading, error}}>
      {children}
    </UserProfileContext.Provider>
  )
}

export const useUserProfileContext = () => {
  const ctx = useContext(UserProfileContext)
  if (!ctx) throw new Error('useUserProfileContext must be used inside UserProfileProvider')
  return ctx
}
