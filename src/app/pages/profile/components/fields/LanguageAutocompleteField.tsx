import React, {useMemo, useState, useEffect} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'

const mockLanguages = [
  'English',
  'Spanish',
  'German',
  'French',
  'Italian',
  'Portuguese',
  'Simplified Chinese',
  'Traditional Chinese',
  'Japanese',
  'Korean',
]

type Props = {
  values: string[]
  onChange: (val: string[]) => void
  placeholder?: string
  minChars?: number
}

export function LanguageAutocompleteField({
  values,
  onChange,
  placeholder = 'Type language...',
  minChars = 0,
}: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  // debounce
  const [debounced, setDebounced] = useState('')
  useEffect(() => {
    const id = setTimeout(() => setDebounced(query.trim()), 200)
    return () => clearTimeout(id)
  }, [query])

  const enableSearch = debounced.length >= minChars && debounced.length > 0

  const visible = useMemo(() => {
    if (!enableSearch) return mockLanguages.slice(0, 10)
    const q = debounced.toLowerCase()
    return mockLanguages.filter((c) => c.toLowerCase().includes(q)).slice(0, 10)
  }, [enableSearch, debounced])

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)

    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <span key={index} style={{fontWeight: 700}}>
              {part}
            </span>
          ) : (
            <span key={index} style={{fontWeight: 300}}>
              {part}
            </span>
          )
        )}
      </>
    )
  }

  const handleAdd = (lang: string) => {
    if (!values.includes(lang)) {
      onChange([...values, lang])
    }
    setQuery('')
    setOpen(false)
  }

  const handleRemove = (lang: string) => {
    onChange(values.filter((v) => v !== lang))
  }

  return (
    <div className='nb-language-autocomplete'>
      {/* chips + input */}
      <div className='nb-language-wrapper'>
        {values.map((lang) => (
          <div key={lang} className='nb-language-chip'>
            <div className='nb-language-chip-text'>{lang}</div>
            <div className='nb-language-chip-remove' onClick={() => handleRemove(lang)}>
              <KTSVG path={toAbsoluteUrl('/media/svg/nobilis/remove.svg')} />
            </div>
          </div>
        ))}
        <input
          className='nb-language-input'
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
        />
      </div>

      {/* menú desplegable */}
      {open && visible.length > 0 && (
        <div className='nb-language-menu'>
          {visible.map((label) => (
            <div
              key={label}
              className='nb-language-item'
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleAdd(label)}
            >
              {highlightMatch(label, debounced)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
