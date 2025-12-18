import {useState, useEffect} from 'react'
import {getSearchableManageMembers} from '../../services/manageMemberService'
import { ManageMemberModel } from '../../pages/manageMembers/models/ManageMemberModel'

export const useSearchableManageMembers = (search: string, activeTab: string) => {
  const [data, setData] = useState<ManageMemberModel | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true
    const fetch = async () => {
      try {
        setLoading(true)
        const data = await getSearchableManageMembers(search ?? '', activeTab)
        if (isMounted) {
          setData(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }
    fetch()
    return () => {
      isMounted = false
    }
  }, [search, activeTab])

  return {data, loading, error}
}
