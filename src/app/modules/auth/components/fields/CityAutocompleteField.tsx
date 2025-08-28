import React, {useMemo, useState, useEffect} from 'react'
import {useField} from 'formik'
import {useCitiesField} from '../../../../hooks/components/useCitiesField'

const highlightMatch = (text: string, query: string) => {
  if (!query) return text
  const safe = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${safe})`, 'gi')
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} style={{fontWeight: 700}}>{part}</span>
        ) : (
          <span key={i} style={{fontWeight: 300}}>{part}</span>
        )
      )}
    </>
  )
}

type Props = {
  name: string
  placeholder?: string
  minChars?: number
}

export default function CityAutocompleteField({
  name,
  placeholder = 'Type city…',
  minChars = 0,
}: Props) {
  const [field, , helpers] = useField<string | undefined>(name)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  // debounce
  const [debounced, setDebounced] = useState('')
  useEffect(() => {
    const id = setTimeout(() => setDebounced(query.trim()), 200)
    return () => clearTimeout(id)
  }, [query])

  const enableSearch = debounced.length >= minChars && debounced.length > 0
  const searchTerm = enableSearch ? debounced : undefined

  const {cities, loading, error} = useCitiesField(searchTerm)
  const items = useMemo<string[]>(() => (Array.isArray(cities) ? cities : []), [cities])

  const visible = useMemo(() => {
    if (!enableSearch) return items.slice(0, 10)
    const q = debounced.toLowerCase()
    return items.filter((c) => c.toLowerCase().includes(q)).slice(0, 10)
  }, [items, enableSearch, debounced])

  return (
    <div className='nb-language-autocomplete'>
      <div className='nb-language-wrapper'>
        <input
          className='nb-language-input'
          value={field.value || ''}
          onChange={(e) => {
            const v = e.target.value
            helpers.setValue(v)        
            setQuery(v)               
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          autoComplete='off'
        />
      </div>

      {open && (
        <div className='nb-language-menu'>
          {loading && enableSearch && (
            <div className='nb-language-item' style={{color: '#808080', cursor: 'default'}}>Buscando…</div>
          )}

          {!enableSearch && minChars > 0 && query.trim().length < minChars && (
            <div className='nb-language-item' style={{color: '#808080', cursor: 'default'}}>
              Escribe al menos {minChars} caracteres…
            </div>
          )}

          {error && enableSearch && (
            <div className='nb-language-item' style={{color: '#808080', cursor: 'default'}}>Error cargando ciudades</div>
          )}

          {!loading && enableSearch && !error && visible.length === 0 && (
            <div className='nb-language-item' style={{color: '#808080', cursor: 'default'}}>Sin resultados</div>
          )}

          {!loading && !error && visible.length > 0 && (
            <>
              {visible.map((label) => (
                <div
                  key={label}
                  className='nb-language-item'
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    helpers.setValue(label)  
                    setQuery(label)
                    setOpen(false)
                  }}
                >
                  {highlightMatch(label, enableSearch ? debounced : '')}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
