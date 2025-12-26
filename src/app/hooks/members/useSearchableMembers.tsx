import {useState, useEffect} from 'react'
import {getSearchableMembers} from '../../services/membersService'

export const useSearchableMembers = (where: string, keywords: string, category?: string) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  useEffect(() => {
    let isMounted = true
    const fetch = async () => {
      try {

        setData([])
        setLoading(true)
        setError(null)

        const data = await getSearchableMembers(where.trim(), keywords.trim(), category  ?? '')
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
  }, [where, keywords, category])

  return {data, loading, error}
}
