import {createContext, useContext, useState} from 'react'
import {useSearchableMembers} from '../hooks/members/useSearchableMembers'

interface SearchParams {
  where: string
  keywords: string
  category?: string
}

interface SearchableMembersState {
  data?: any | null
  loading: boolean
  error?: Error | null
  searchParams: SearchParams
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>
}

const SearchableMembersContext = createContext<SearchableMembersState | undefined>(undefined)

export const SearchableMembersProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    where: '',
    keywords: '',
    category: '',
  })

  const {data, error, loading} = useSearchableMembers(searchParams.where, searchParams.keywords, searchParams.category ?? '')

  return (
    <SearchableMembersContext.Provider
      value={{data, loading, error, searchParams, setSearchParams}}
    >
      {children}
    </SearchableMembersContext.Provider>
  )
}

export const useSearchableMembersContext = () => {
  const ctx = useContext(SearchableMembersContext)
  if (!ctx)
    throw new Error('useSearchableMembersContext must be used inside SearchableMembersProvider')
  return ctx
}
