import React, {useMemo, useState, useEffect} from 'react'
import {useField} from 'formik'
import countries from '../data/countries.json'

const highlightMatch = (text: string, query: string) => {
  if (!query) return text
  const safe = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${safe})`, 'gi')
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} style={{fontWeight: 700}}>
            {part}
          </span>
        ) : (
          <span key={i} style={{fontWeight: 300}}>
            {part}
          </span>
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

type Country = {
  code: string
  name: string
}

export default function CountriesAutocompleteField({name, minChars = 0}: Props) {
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

  const items = useMemo<Country[]>(() => (Array.isArray(countries) ? countries : []), [])

  const visible = useMemo(() => {
    if (!enableSearch) return items.slice(0, 10)
    const q = debounced.toLowerCase()
    return items.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 10)
  }, [items, enableSearch, debounced])

  const selectedCountry = useMemo(() => {
    return items.find((c) => c.code === field.value)
  }, [items, field.value])

  const displayValue = selectedCountry ? selectedCountry.name : query
 
  return (
    <div className='nb-language-autocomplete'>
      <div className='nb-language-wrapper'>
        <input        
          className={`nb-language-input ${selectedCountry ? 'selected' : ''}`}
          value={displayValue}
          onChange={(e) => {
            const v = e.target.value
            setQuery(v)
            if (selectedCountry && v !== selectedCountry.name) {
              helpers.setValue('')
            }
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          autoComplete='new-email'
        />
      </div>

      {open && (
        <div className='nb-language-menu'>
          {visible.map((country) => (
            <div
              key={country.code}
              className='nb-language-item'
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                helpers.setValue(country.code)
                setQuery(country.name)
                setOpen(false)
              }}              
            >
              {highlightMatch(country.name, enableSearch ? debounced : '')}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}