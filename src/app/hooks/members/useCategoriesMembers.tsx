import {useState, useEffect} from 'react'
import {getCategoriesMembers} from '../../services/membersService'

export const useCategoriesMembers = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true
    const fetch = async () => {
      try {
        const data = await getCategoriesMembers()
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
  }, [])

  return {data, loading, error}
}
