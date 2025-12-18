import React from 'react'
import { RejectionInfo } from '../../teamExperiences/models/ExperienceSummaryModel'

type Props = {
  items?: RejectionInfo[]
}

export const InfoHistory: React.FC<Props> = ({
  items = [
    {
      isRejected: true,
      reason: 'Date - [Dropdown_cancelled_reason]',
      note: 'Text Note Reason',
    },
    {
      isRejected: true,
      reason: 'Date - [Dropdown_cancelled_reason]',
      note: 'Text Note Reason',
    },
    {
      isRejected: true,
      reason: 'Date - [Dropdown_cancelled_reason]',
      note: 'Text Note Reason',
    },
    {
      isRejected: true,
      reason: 'Date - [Dropdown_cancelled_reason]',
      note: 'Text Note Reason',
    },
  ],
}) => {
  return (
    <div className="info-history">
      <div className="info-history__header">
        <span className="info-history__label">Info</span>
      </div>

      {items.map((item, index) => (
        <InfoHistoryItem
          key={index}
          reason={item.reason}
          note={item.note}
        />
      ))}
    </div>
  )
}

export const InfoHistoryItem: React.FC<RejectionInfo> = ({ reason, note }) => {
  return (
    <div className="info-history__item">
      <div className="info-history__item-title">
        {reason}
      </div>
      <div className="info-history__item-description">
        {note}
      </div>
    </div>
  )
}
