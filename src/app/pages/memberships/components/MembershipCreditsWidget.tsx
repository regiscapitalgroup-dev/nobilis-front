import React, {RefObject, useEffect} from 'react'
import credits from '../helper/credit-detail.json'

type CreditItem = {
  activity: string
  creditEarningRate: string
  notes: string
}

type Props = {
  refToScroll: RefObject<HTMLDivElement>
}

const MembershipCreditsWidget: React.FC<Props> = ({refToScroll}) => {
  const rows: CreditItem[] = (credits as CreditItem[]) || []

  const rolloverRow: CreditItem = {
    activity: 'Credit Rollover (Excess over 25K)',
    creditEarningRate:
      `up to $25K  -  $1 = 1 Credits\n` +
      `$25K to $75K  -  $1 = 0.5 Credits\n` +
      `$75K+  -  $1 = 0 Credits`,
    notes: 'Points are valid for 3 years from when they are earned.',
  }

/*   useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }, []) */

  return (
    <div className='lp-shell mt-20' ref={refToScroll}>
      {/* Header Figma */}
      <div className='lp-hero'>
        <h2 className='lp-title'>Loyalty program</h2>
        <p className='lp-sub'>
          The loyalty program rewards active participation with credits that can cover up to 3 years
          of membership fees and offer discounts on experiences
        </p>
      </div>

      {/* Card */}
      <div className='lp-card lp-card--pad40 lp-card--outline'>
        <table className='lp-table'>
          <colgroup>
            <col style={{width: '40%'}} />
            <col style={{width: '27%'}} />
            <col style={{width: '33%'}} />
          </colgroup>

          <thead>
            <tr>
              <th>Activity</th>
              <th>Credit Earning Rate</th>
              <th>Notes</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((item, idx) => (
              <tr key={idx}>
                <td colSpan={3}>
                  <div className='lp-row-inner'>
                    <div className='lp-col lp-col-activity'>{item.activity}</div>
                    <div className='lp-col lp-col-rate'>{item.creditEarningRate}</div>
                    <div className='lp-col lp-col-notes'>{item.notes}</div>
                  </div>
                </td>
              </tr>
            ))}

            {/* Rollover */}
            <tr>
              <td colSpan={3}>
                <div className='lp-row-inner'>
                  <div className='lp-col lp-col-activity'>{rolloverRow.activity}</div>
                  <div className='lp-col lp-col-rate'>
                    {rolloverRow.creditEarningRate.split('\n').map((l, i) => (
                      <div key={i}>{l}</div>
                    ))}
                  </div>
                  <div className='lp-col lp-col-notes'>{rolloverRow.notes}</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export {MembershipCreditsWidget}
