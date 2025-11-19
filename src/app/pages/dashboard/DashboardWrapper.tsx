/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useRef} from 'react'
import {useLayout} from '../../../_metronic/layout/core'
import MembershipPageWrapper from '../memberships/MembershipPageWrapper'


const DashboardPage: FC = () => (
  <>
    <MembershipPageWrapper />
  </>
)

const DashboardWrapper: FC = () => {
  const {config, setLayout} = useLayout()
  const restoreRef = useRef(config)

  useEffect(() => {
    restoreRef.current = config

    setLayout({
      ...config,
      header: {...config.header, display: false},
      toolbar: {...config.toolbar, display: false},
      aside: {...config.aside, display: false},
      footer: {...config.footer, display: false},
      main: {
        ...config.main,
        body: {...config.main?.body, class: 'app-blank'},
      },
    })

    document.body.classList.add('bg-white')

    return () => {
      setLayout(restoreRef.current)
      document.body.classList.remove('bg-white')
    }
  }, [])

  return (
    <>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
