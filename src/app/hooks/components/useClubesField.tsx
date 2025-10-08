// src/hooks/useMemberships.ts
import {useState, useEffect} from 'react'
import {getClubes} from '../../services/componentsService'

export const useClubesField = (search?: string) => {
  const [collection, setCollection] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchCities = async () => {
      try {
        setLoading(true)
        setError(null)
        const term = search?.trim() ? search.trim() : undefined
        const data = await getClubes(term)
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
