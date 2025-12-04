import {createContext, useContext, useState} from 'react'
import {useUserProfile} from '../hooks/profile/useProfile'
import {FullUserProfileModel} from '../pages/biography/models/FullUserProfileModel'

interface Params {
  userSelected?: string
}
interface UserProfileState {
  data?: FullUserProfileModel | null
  loading: boolean
  error?: Error | null
  refetch: () => Promise<void>
  searchParams: Params
  setSearchParams: React.Dispatch<React.SetStateAction<Params>>
}

const UserProfileContext = createContext<UserProfileState | undefined>(undefined)

export const UserProfileProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [searchParams, setSearchParams] = useState<Params>({
    userSelected: '',
  })

  const {data, error, loading, refetch} = useUserProfile(searchParams.userSelected)

  return (
    <UserProfileContext.Provider
      value={{data, loading, error, refetch, searchParams, setSearchParams}}
    >
      {children}
    </UserProfileContext.Provider>
  )
}

export const useUserProfileContext = () => {
  const ctx = useContext(UserProfileContext)
  if (!ctx) throw new Error('useUserProfileContext must be used inside UserProfileProvider')
  return ctx
}
