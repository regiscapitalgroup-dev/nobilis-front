import {useState, useEffect} from 'react'
import { reasons } from '../../services/waitingListService'

export const useReasonField = () => {
  const [collection, setCollection] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetch = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await reasons()
        if (isMounted) setCollection(Array.isArray(data) ? data : [])
      } catch (err) {
        if (isMounted) setError(err as Error)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetch()
    return () => {
      isMounted = false
    }
  }, [])

  return {collection, loading, error}
}
