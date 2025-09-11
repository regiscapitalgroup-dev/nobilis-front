/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {useLayout} from '../../../_metronic/layout/core'

const DashboardCorePage: FC = () => (
  <>
    <div>Dashboard</div>
  </>
)

const DashboardCoreWrapper: FC = () => {
  /* const intl = useIntl()
  const {config, setLayout} = useLayout() */

  

  return (
    <>
      <div      
      />

      <div className='nb-app-container'>
        <DashboardCorePage />
      </div>
    </>
  )
}

export {DashboardCoreWrapper}
