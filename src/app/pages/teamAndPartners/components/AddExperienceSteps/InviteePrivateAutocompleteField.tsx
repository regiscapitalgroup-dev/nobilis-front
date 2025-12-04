import React, { useMemo, useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../../../_metronic/helpers'
import { useFormikContext } from 'formik'

const mockInviteeList = [
    {id:1,name:'James Smith',imageUrl:toAbsoluteUrl('/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_profile_default.png')},
    {id:2,name:'Jaden Wolfgang',imageUrl:toAbsoluteUrl('/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_profile_default.png')},
    {id:3,name:'Robert Johnson',imageUrl:toAbsoluteUrl('/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_profile_default.png')},
    {id:4,name:'Michael Williams',imageUrl:toAbsoluteUrl('/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_profile_default.png')},
    {id:5,name:'David Jones',imageUrl:toAbsoluteUrl('/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_profile_default.png')},
    {id:6,name:'William Brown',imageUrl:toAbsoluteUrl('/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_profile_default.png')},
    {id:7,name:'Joseph Davis',imageUrl:toAbsoluteUrl('/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_profile_default.png')},
    {id:8,name:'Charles Miller',imageUrl:toAbsoluteUrl('/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_profile_default.png')},
    {id:9,name:'Thomas Wilson',imageUrl:toAbsoluteUrl('/media/svg/nobilis/teams_and_partner/team_and_partner_experiences_past_profile_default.png')},
]

type Props = {
    values: number[]
    onChange: (val: number[]) => void
    placeholder?: string
    minChars?: number
}

export function InviteePrivateAutocompleteField({
    values,
    onChange,
    placeholder = 'List of invitees',
    minChars = 0,
}: Props) {

    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const formik = useFormikContext()

    // debounce
    const [debounced, setDebounced] = useState('')
    useEffect(() => {
        const id = setTimeout(() => setDebounced(query.trim()), 200)
        return () => clearTimeout(id)
    }, [query])

    const enableSearch = debounced.length >= minChars && debounced.length > 0

    const visible = useMemo(() => {
        if (!enableSearch) return mockInviteeList.slice(0, 10)

        const q = debounced.toLowerCase()
        return mockInviteeList
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
        .map((id) => mockInviteeList.find((i) => i.id === id))
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
                        <div
                            key={item.id}
                            className='nb-language-item'
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleAdd(item.id)}
                        >
                            {highlightMatch(item.name, debounced)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
