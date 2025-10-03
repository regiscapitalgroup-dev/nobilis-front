import React, { useMemo, useState, useEffect } from 'react'
import { useField, useFormikContext } from 'formik'
import { useIntroduction } from '../../../hooks/introduction/useIntroduction'
import { KTSVG } from '../../../../_metronic/helpers'

const highlightMatch = (text: string, query: string) => {
  if (!query) return text
  const safe = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${safe})`, 'gi')
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} style={{ fontWeight: 700 }}>{part}</span>
        ) : (
          <span key={i} style={{ fontWeight: 300 }}>{part}</span>
        )
      )}
    </>
  )
}

type IntroductionItem = {
  id: number
  title: string
  description: string
  cost: string
}

type Props = {
  name: string
  placeholder?: string
  minChars?: number
}

export default function IntroductionAutocompleteField({
  name,
  placeholder = 'Select the type of introduction from the dropdown',
  minChars = 0,
}: Props) {
  const [field, , helpers] = useField<string | undefined>(name)
  const { setFieldValue } = useFormikContext<any>()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')   // ✅ texto mostrado en input
  const [search, setSearch] = useState('') // ✅ texto usado para filtrar

  // debounce para búsqueda
  const [debounced, setDebounced] = useState('')
  useEffect(() => {
    const id = setTimeout(() => setDebounced(search.trim()), 200)
    return () => clearTimeout(id)
  }, [search])

  const enableSearch = debounced.length >= minChars && debounced.length > 0

  const { collection, loading, error } = useIntroduction()
  const items = useMemo<IntroductionItem[]>(() => {
    return Array.isArray(collection) ? collection : []
  }, [collection])

  const visible = useMemo(() => {
    if (!enableSearch) return items.slice(0, 10) // ✅ si no busca, muestra todos
    const q = debounced.toLowerCase()
    return items.filter((c) => c.title.toLowerCase().includes(q)).slice(0, 10)
  }, [items, enableSearch, debounced])

  return (
    <div className="nb-language-autocomplete">
      <div className="custom-autocomplete-wrapper">
        <input
          className="custom-autocomplete-input"
          value={query}
          readOnly   // ✅ se comporta como select
          onClick={() => setOpen((prev) => !prev)} 
          autoComplete="off"
          placeholder={placeholder}
        />
        <KTSVG 
          path='/media/svg/nobilis/arrow-select.svg' 
        />
      </div>

      {open && (
        <div className="nb-language-menu">
          {loading && enableSearch && (
            <div className="nb-language-item" style={{ color: '#808080', cursor: 'default' }}>
              Searching…
            </div>
          )}

          {!enableSearch && minChars > 0 && search.trim().length < minChars && (
            <div className="nb-language-item" style={{ color: '#808080', cursor: 'default' }}>
              Write at least {minChars} characters…
            </div>
          )}

          {error && enableSearch && (
            <div className="nb-language-item" style={{ color: '#808080', cursor: 'default' }}>
              Error loading items
            </div>
          )}

          {!loading && enableSearch && !error && visible.length === 0 && (
            <div className="nb-language-item" style={{ color: '#808080', cursor: 'default' }}>
              No results
            </div>
          )}

          {!loading && !error && visible.length > 0 && (
            <>
              {visible.map((item) => (
                <div
                  key={item.id}
                  className="nb-language-item"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    helpers.setValue(String(item.id))          
                    setFieldValue('introductionCost', item.cost) 
                    setQuery(item.title)    // ✅ título en input
                    setSearch('')           // ✅ limpia búsqueda => vuelve a mostrar todos
                    setOpen(false)
                  }}
                >
                  <div>
                    <strong>{highlightMatch(item.title, enableSearch ? debounced : '')}</strong>
                  </div>
                  <div style={{ fontSize: 12, color: '#808080' }}>{item.description}</div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
