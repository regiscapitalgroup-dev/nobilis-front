import { FC, useState } from 'react'
import { useField } from 'formik'
import { KTSVG } from '../../../../../_metronic/helpers'
import { useQualificationsField } from '../../../../hooks/components/useQualificationsField'

interface Option {
  id: number
  label: string
}

interface Props {
  name: string
  label: string
  placeholder?: string
}

const SelectInviteeQualificationsField: FC<Props> = ({ name, label, placeholder }) => {
  const [field, , helpers] = useField(name)
  const [open, setOpen] = useState(false)
  const { collection } = useQualificationsField()

  const options: Option[] = collection?.map((item: any) => ({
    id: item.id,
    label: item.name,
  }))

  const handleSelect = (option: Option) => {
    helpers.setValue(option.id) 
    setOpen(false)
  }

  const selectedLabel =
    options.find((opt) => opt.id === field.value)?.label || placeholder

  return (
    <div className='references-form__field references-select'>
      <label>{label}</label>
      <div
        className='references-select__control'
        onClick={() => setOpen(!open)}
      >
        <span
          className={`references-select__placeholder ${field.value ? 'active' : ''}`}
        >
          {selectedLabel}
        </span>
        <KTSVG path='/media/svg/nobilis/arrow_up.svg' />
      </div>

      {open && (
        <div className='references-select__menu'>
          {options.map((opt) => (
            <div
              key={opt.id}
              className='references-select__option'
              onClick={() => handleSelect(opt)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SelectInviteeQualificationsField
