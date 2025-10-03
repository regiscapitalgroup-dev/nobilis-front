import React from 'react'
import {useField, useFormikContext} from 'formik'
import {DatePicker} from 'antd'
import type {Dayjs} from 'dayjs'

interface Props {
  name: string
  label: string
  placeholder?: string
}

const DateTimePickerField: React.FC<Props> = ({name, label, placeholder}) => {
  const {setFieldValue} = useFormikContext<any>()
  const [field, meta] = useField(name)

  return (
    <div className='fv-row mb-5'>
      <label className='form-label'>{label}</label>
      <DatePicker
        value={field.value ? (field.value as Dayjs) : null}
        onChange={(value) => setFieldValue(name, value)}
        showTime={{format: 'HH:mm'}}
        format='D MMM YYYY HH:mm'
        placeholder={placeholder}
        className='form-control'
        style={{width: '100%'}}
      />
      {meta.touched && meta.error ? <div className='text-danger mt-1'>{meta.error}</div> : null}
    </div>
  )
}

export default DateTimePickerField
