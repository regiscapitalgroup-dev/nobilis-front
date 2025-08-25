import React, {useMemo, useState, useEffect} from 'react'
import { KTSVG } from '../../../../../_metronic/helpers'

const mockCountries = ['United States', 'Canada', 'Mexico', 'Argentina', 'Spain']

export default function CountryAutocompleteFieldStandalone({
  value,
  onChange,
  placeholder = 'Country',
  minChars = 0,
}: {
  value: string
  onChange: (val: string) => void
  placeholder?: string
  minChars?: number
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(value)

  const [debounced, setDebounced] = useState('')
  useEffect(() => {
    const id = setTimeout(() => setDebounced(query.trim()), 250)
    return () => clearTimeout(id)
  }, [query])

  const enableSearch = debounced.length >= minChars && debounced.length > 0
  const items = mockCountries
  const visible = useMemo(() => {
    if (!enableSearch) return items.slice(0, 10)
    const q = debounced.toLowerCase()
    return items.filter((c) => c.toLowerCase().includes(q)).slice(0, 10)
  }, [items, enableSearch, debounced])

  return (
    <div className="nb-country-autocomplete">
      <div className="nb-country-wrapper">
        <input
          className="nb-country-input"
          value={query}
          onChange={(e) => {
            const v = e.target.value
            setQuery(v)
            onChange(v)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
        />

        <KTSVG
          path={'/media/svg/nobilis/chevUp.svg'}
          className={`nb-country-icon ${open ? 'open' : ''}`}
        />
      </div>

      {open && (
        <div className="nb-country-menu">
          {visible.map((label) => (
            <div
              key={label}
              className="nb-country-item"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setQuery(label)
                onChange(label)
                setOpen(false)
              }}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
