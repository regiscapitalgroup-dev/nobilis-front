import React, { useMemo, useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../../../_metronic/helpers'
import { useFormikContext } from 'formik'
import { getCategories } from '../../../../services/teamAndPartnerService'

/* const mockCategories = [
    'Lifestyle',
    'Profession',
] */

type Props = {
    values: number[]
    onChange: (val: number[]) => void
    placeholder?: string
    minChars?: number
}

export function CategoryAutocompleteField({
    values,
    onChange,
    placeholder = 'Category',
    minChars = 0,
}: Props) {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [mockCategories, setMockCategories] = useState([])
    const formik = useFormikContext();

    // debounce
    const [debounced, setDebounced] = useState('')
    useEffect(() => {
        const id = setTimeout(() => setDebounced(query.trim()), 200)
        return () => clearTimeout(id)
    }, [query])


    useEffect(() => {
        const fetchData = async () => {
            const categories = await getCategories();
            setMockCategories(categories.results);
        }
        fetchData();
    },[])

    const enableSearch = debounced.length >= minChars && debounced.length > 0

    const visible = useMemo(() => {
        if (!enableSearch) return mockCategories.slice(0, 10)
        const q = debounced.toLowerCase()
        return mockCategories
        .filter((c) => c.name.toLowerCase().includes(q))
        .slice(0, 10)
    }, [enableSearch, debounced, mockCategories])

    const safeValues = Array.isArray(values) ? values : [];

    const selectedCategories = useMemo(() => {
        return safeValues
            .map((id) => mockCategories.find((c) => c.id === id))
            .filter(Boolean);
    }, [safeValues, mockCategories]);



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

    const handleAdd = (catId: number) => {
        if (!values.includes(catId)) {
            onChange([...values, catId])
        }
        setQuery('')
        setOpen(false)
    }

    const handleRemove = (catId: number) => {
        onChange(values.filter((v) => v !== catId))
    }

    const validateForm = () => {
        formik.setFieldTouched("category_ids", true, false);
        formik.validateField("category_ids");
    };

    return (
        <div className='nb-language-autocomplete'>
            {/* chips + input */}
            <div className='nb-language-wrapper'>
                {selectedCategories.map((cat, index) => (
                    <div key={`category-selected-${index}`} className="tap-add-experience-2-category-pill tap-add-experience-2-category-pill--selected">
                        <div className="">
                            <KTSVG path={toAbsoluteUrl('/media/svg/nobilis/teams_and_partner/category_icon.svg')} />
                        </div>
                        <span>{cat.name}</span>
                        <div className='' onClick={() => handleRemove(cat.id)}>
                            <KTSVG path={toAbsoluteUrl('/media/svg/nobilis/remove.svg')} />
                        </div>
                    </div>
                ))}
                <input
                    className='tap-add-experience-input-category nb-language-input'
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setOpen(true);
                        validateForm();
                    }}
                    onFocus={() => {
                        setOpen(true);
                        validateForm();
                    }}
                    onBlur={() => {
                        setTimeout(() => setOpen(false), 120);
                        validateForm();
                    }}
                />
            </div>

            {/* menú desplegable */}
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
