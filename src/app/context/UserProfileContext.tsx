// context/UserProfileContext.tsx
import {createContext, useContext} from 'react'
import {useUserProfile} from '../hooks/profile/useProfile'
import {FullUserProfileModel} from '../pages/biography/models/FullUserProfileModel'

interface UserProfileState {
  data?: FullUserProfileModel | null
  loading: boolean
  error?: Error | null
  refetch: () => Promise<void>
}

const UserProfileContext = createContext<UserProfileState | undefined>(undefined)

export const UserProfileProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {data, error, loading, refetch} = useUserProfile()

  return (
    <UserProfileContext.Provider value={{data, loading, error, refetch}}>
      {children}
    </UserProfileContext.Provider>
  )
}

export const useUserProfileContext = () => {
  const ctx = useContext(UserProfileContext)
  if (!ctx) throw new Error('useUserProfileContext must be used inside UserProfileProvider')
  return ctx
}
