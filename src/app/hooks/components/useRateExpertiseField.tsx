import {useState, useEffect} from 'react'
import {getRateExpertise} from '../../services/componentsService'

export const useRateExpertiseField = (search?: string) => {
  const [collection, setCollection] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchCities = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getRateExpertise()
        if (isMounted) setCollection(Array.isArray(data) ? data : [])
      } catch (err) {
        if (isMounted) setError(err as Error)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchCities()
    return () => {
      isMounted = false
    }
  }, [search])

  return {collection, loading, error}
}
