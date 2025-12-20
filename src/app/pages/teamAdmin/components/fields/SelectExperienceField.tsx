import React, { useMemo, useState, useEffect } from 'react'
import { useFormikContext } from 'formik'
import { KTSVG, toAbsoluteUrl } from '../../../../../_metronic/helpers'
import { getExperiences } from '../../../../services/teamExperienceService'
import { EXPERIENCE_STATUS } from '../../../teamExperiences/models/ExperienceStatus'

type Props = {
    values: number[]
    onChange: (val: number[]) => void
    placeholder?: string
    minChars?: number
}

export function SelectExperienceField({
    values,
    onChange,
    placeholder = '',
    minChars = 0,
}: Props) {

    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const formik = useFormikContext()
    const [experiences, setExperiences] = useState([])

    // se inicializa una ves cargado el componente
    useEffect(() => {
        const fetchData = async () => {
            const experiences = await getExperiences({ limit: 20, offset: 0, status: EXPERIENCE_STATUS.PUBLISHED });
            setExperiences(experiences.results);
        }
        fetchData();
    },[])

    // debounce
    const [debounced, setDebounced] = useState('')
    useEffect(() => {
        const id = setTimeout(() => setDebounced(query.trim()), 200)
        return () => clearTimeout(id)
    }, [query])

    const enableSearch = debounced.length >= minChars && debounced.length > 0

    const visible = useMemo(() => {
        if (!enableSearch) return experiences.slice(0, 10)

        const q = debounced.toLowerCase()
        return experiences
            .filter((c) => c.name.toLowerCase().includes(q))
            .slice(0, 10)
    }, [enableSearch, debounced,experiences])

    const highlightMatch = (text: string, query: string) => {
        if (!query) return text

        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
        const parts = text.split(regex)

        return (
            <>
                {parts.map((part, index) =>
                    regex.test(part) ? (
                        <span key={index} style={{ fontWeight: 700 }}>
                            {part}
                        </span>
                    ) : (
                        <span key={index} style={{ fontWeight: 300 }}>
                            {part}
                        </span>
                    )
                )}
            </>
        )
    }

    const handleAdd = (itemId: number) => {
        if (!values.includes(itemId)) {
            onChange([...values, itemId])
        }
        setQuery('')
        setOpen(false)
    }

    const handleRemove = (itemId: number) => {
        onChange(values.filter((v) => v !== itemId))
    }

    const validateForm = () => {
        formik.setFieldTouched("invitees", true)
        formik.validateForm()
    }

    const selectedObjects = (values ?? [])
        .map((id) => experiences.find((i) => i.id === id))
        .filter(Boolean)

    return (
        <div className='nb-language-autocomplete'>
            <div className='nb-language-wrapper'>
                {(selectedObjects ?? []).map((item: any, index: number) => (
                    <div key={item.id} className="nb-admin-team-item-select">
                        {/* <div className='tap-add-experience-2-image'>
                            <img src={item.imageUrl} width={24} height={24} />
                        </div> */}
                        <span>{item.title}</span>
                        <div onClick={() => handleRemove(item.id)}>
                            <KTSVG path={toAbsoluteUrl('/media/svg/nobilis/remove.svg')} />
                        </div>
                    </div>
                ))}

                <input className='tap-add-experience-input-category nb-language-input'
                    value={query} onChange={(e) => {
                        setQuery(e.target.value)
                        setOpen(true)
                        validateForm()
                    }}
                    onFocus={() => {
                        setOpen(true)
                        validateForm()
                    }}
                    onBlur={() => setTimeout(() => setOpen(false), 120)}
                />
            </div>

            {open && visible.length > 0 && (
                <div className='nb-language-menu'>
                    {visible.map((item) => (
                        <div key={item.id} className='nb-language-item' onMouseDown={(e) => e.preventDefault()} onClick={() => handleAdd(item.id)}>
                            {highlightMatch(item.title, debounced)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
