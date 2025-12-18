import React, { useMemo, useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../../../../_metronic/helpers'
import { useFormikContext } from 'formik'
import { getMyTeamMembers } from '../../../../../services/teamExperienceService'

type Props = {
    values: number[]
    onChange: (val: number[]) => void
    placeholder?: string
    minChars?: number
}

export function MembersHostPresenceAutocompleteField({
    values,
    onChange,
    placeholder = 'List of invitees',
    minChars = 0,
}: Props) {

    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const formik = useFormikContext()
    const [membersTeam, setMembersTeam] = useState([])
    // debounce
    const [debounced, setDebounced] = useState('')

    // se inicializa una ves cargado el componente
    const fetchData = async (search:string) => {
        let membersTeam_ = await getMyTeamMembers(search);
        setMembersTeam(membersTeam_.results);
    }

    useEffect(() => {
        const id = setTimeout(() => setDebounced(query.trim()), 200)
        return () => clearTimeout(id)
    }, [query])

    const enableSearch = debounced.length >= minChars && debounced.length > 0

    const visible = useMemo(() => {
        if (!enableSearch) return membersTeam.slice(0, 10)

        const q = debounced.toLowerCase()
        fetchData(q);
        return membersTeam
            .filter((c) => c.name.toLowerCase().includes(q))
            .slice(0, 10)
    }, [enableSearch, debounced])

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

    const selectedObjects = values
        .map((id) => membersTeam.find((i) => i.id === id))
        .filter(Boolean)

    return (
        <div className='nb-language-autocomplete'>
            <div className='nb-language-wrapper'>
                {selectedObjects.map((item: any, index: number) => (
                    <div key={item.id} className="tap-add-experience-2-category-pill tap-add-experience-2-category-pill--selected">
                        <div className='tap-add-experience-2-image'>
                            <img src={item.imageUrl} width={24} height={24} />
                        </div>
                        <span>{item.name}</span>
                        <div onClick={() => handleRemove(item.id)}>
                            <KTSVG path={toAbsoluteUrl('/media/svg/nobilis/remove.svg')} />
                        </div>
                    </div>
                ))}

                <input
                    className='tap-add-experience-input-category nb-language-input'
                    value={query}
                    onChange={(e) => {
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
                        <div className="tap-add-experience-2-invitee-card" key={item.id} onMouseDown={(e) => e.preventDefault()} onClick={() => handleAdd(item.id)}>
                            <img className="tap-add-experience-2-invitee-card__avatar" src={item.imageUrl} alt="avatar"/>
                            <div className="tap-add-experience-2-invitee-card__name">{item.name}</div>
                            <div className="tap-add-experience-2-invitee-card__role-wrapper">
                                <div className="tap-add-experience-2-invitee-card__role">{item.position}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
