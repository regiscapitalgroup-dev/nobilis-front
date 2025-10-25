import React, {FC, useState, useRef, useEffect} from 'react'

interface SelectOption {
  id: number
  name: string
  description?: string | null
}

interface CustomSelectProps {
  value: number | string 
  onChange: (value: number) => void
  options: SelectOption[]
  placeholder?: string
  name?: string
  onBlur?: () => void
}

export const CustomSelect: FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  name,
  onBlur,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(opt => opt.id === value)
  const displayValue = selectedOption ? selectedOption.name : ''

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        if (onBlur) onBlur()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onBlur])

  const handleSelectOption = (optionId: number) => {
    onChange(optionId)
    setIsOpen(false)
  }

  return (
    <div className='custom-select' ref={selectRef}>
      <div
        className='custom-select__trigger'
        onClick={() => setIsOpen(!isOpen)}
        role='button'
        tabIndex={0}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
      >
        <div className='custom-select__value'>{displayValue || placeholder}</div>
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={`custom-select__icon ${isOpen ? 'custom-select__icon--open' : ''}`}
        >
          <path
            d='M13 6L8 11L3 6'
            stroke='#B4B4B4'
            strokeWidth='1'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>

      {isOpen && (
        <div className='custom-select__dropdown' role='listbox'>
          {options.map((option) => (
            <div
              key={option.id}
              className={`custom-select__option ${
                value === option.id ? 'custom-select__option--selected' : ''
              }`}
              onClick={() => handleSelectOption(option.id)}
              role='option'
              aria-selected={value === option.id}
            >
              <div>{option.name}</div>
              {option.description && (
                <div className='custom-select__option-description'>
                  {option.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}