import React from 'react'

type Props = {
  title: string
  children: React.ReactNode
}

export const AsideMenuSection: React.FC<Props> = ({title, children}) => {
  return (
    <div className="aside-nobilis-section">
      <div className="aside-nobilis-section-title">{title}</div>
      <div className="aside-nobilis-section-items">{children}</div>
    </div>
  )
}
