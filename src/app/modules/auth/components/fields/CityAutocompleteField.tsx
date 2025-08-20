// CityAutocompleteField.tsx
import React, {useMemo, useState, useEffect} from 'react'
import {useField} from 'formik'
import { useCitiesField } from '../../../../hooks/components/useCitiesField'

function highlight(label: string, q: string) {
  if (!q) return label
  const i = label.toLowerCase().indexOf(q.toLowerCase())
  if (i === -1) return label
  const before = label.slice(0, i)
  const match = label.slice(i, i + q.length)
  const after = label.slice(i + q.length)
  return (
    <>
      {before}
      <strong>{match}</strong>
      {after}
    </>
  )
}

export default function CityAutocompleteField({
  name,
  placeholder = '',
  minChars = 0, // 0 = carga listado inicial; 2 = espera a que escriban 2+ chars
}: {
  name: string
  placeholder?: string
  minChars?: number
}) {
  const [field, , helpers] = useField<string | undefined>(name)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  // Debounce para el término escrito
  const [debounced, setDebounced] = useState('')
  useEffect(() => {
    const id = setTimeout(() => setDebounced(query.trim()), 250)
    return () => clearTimeout(id)
  }, [query])

  // 🔹 Solo consideramos “búsqueda activa” si hay texto y cumple minChars
  const enableSearch = debounced.length >= minChars && debounced.length > 0
  const searchTerm = enableSearch ? debounced : undefined

  // Llama al hook: sin search = listado inicial; con search = filtrado
  const {cities, loading, error} = useCitiesField(searchTerm)

  // Normaliza (endpoint: string[])
  const items = useMemo<string[]>(
    () => (Array.isArray(cities) ? cities : []),
    [cities]
  )

  // Lista visible (top 10)
  const visible = useMemo(() => {
    if (!enableSearch) return items.slice(0, 10)
    const q = debounced.toLowerCase()
    return items.filter((c) => c.toLowerCase().includes(q)).slice(0, 10)
  }, [items, enableSearch, debounced])

  return (
    <div className='nb-autocomplete'>
      <input
        className='nb-autocomplete-input input-text-style'
        value={field.value || ''}
        placeholder={placeholder}
        onChange={(e) => {
          const v = e.target.value
          helpers.setValue(v)   // mantiene lo que escribes en Formik
          setQuery(v)           // dispara búsqueda (debounced)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        autoComplete='off'
      />

      {open && (
        <div className='nb-autocomplete-menu'>
          {/* 🔹 NO mostrar “Buscando…” si no hay búsqueda activa */}
          {loading && enableSearch && (
            <div className='nb-autocomplete-item input-text-style'>Buscando…</div>
          )}

          {/* Mensaje de guía si exiges mínimo de caracteres y aún no se cumple */}
          {!enableSearch && minChars > 0 && (query.trim().length < minChars) && (
            <div className='nb-autocomplete-item input-text-style'>
              Escribe al menos {minChars} caracteres…
            </div>
          )}

          {/* Mostrar error solo en búsqueda activa (no en listado inicial) */}
          {error && enableSearch && (
            <div className='nb-autocomplete-item input-text-style'>Error cargando ciudades</div>
          )}

          {/* “Sin resultados” solo cuando hay búsqueda activa */}
          {!loading && enableSearch && !error && visible.length === 0 && (
            <div className='nb-autocomplete-item input-text-style'>Sin resultados</div>
          )}

          {/* Opciones (iniciales o de búsqueda) */}
          {!loading && !error && visible.length > 0 && (
            <>
              {visible.map((label) => (
                <div
                  key={label}
                  className='nb-autocomplete-item input-text-style'
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    helpers.setValue(label) // guarda el string en Formik
                    setQuery(label)
                    setOpen(false)
                  }}
                >
                  {highlight(label, enableSearch ? debounced : '')}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
