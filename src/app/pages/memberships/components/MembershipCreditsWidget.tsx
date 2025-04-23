import React, {RefObject} from 'react'
import credits from '../helper/credit-detail.json'
type Props = {
  refToScroll: RefObject<HTMLDivElement>
}

const MembershipCreditsWidget: React.FC<Props> = ({refToScroll}) => {
  return (
    <div className='col-xl-12'>
      <div className={`card card-xxl-stretch mb-5 mb-xl-8 bg-dark`} ref={refToScroll}>
        {/* begin::Header */}
        <div className='card-header align-items-center flex-column pt-5 border-0'>
          <h3 className='card-title '>
            <span className='card-label fw-bolder fs-3 mb-1 text-white'>
              Built-in credit system structure
            </span>
          </h3>
          <h3>
            <span className='text-muted text-center mt-1 fw-bold fs-7'>
              Nobilis is a member-led community where active participation elevates recognition
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;creates value for others, and offers reductions on the annual
              membership fee.
            </span>
          </h3>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-striped table-dark  align-middle gs-0 gy-4'>
              {/* begin::Table head */}
              <thead>
                <tr className='fw-bolder text-muted'>
                  <th className='min-w-200px'>Activity</th>
                  <th className='min-w-200px'>Credit Eaming Rate</th>
                  <th className='min-w-300px'>Notes</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}

              <tbody>
                {credits.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className='d-flex justify-content-start flex-column'>
                          <span className='text-white fw-bolder text-hover-secondary fs-8'>
                            {item.activity}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className='text-white fw-bolder text-hover-secondary d-block fs-8'>
                        {item.creditEarningRate}
                      </span>
                    </td>
                    <td className='d-flex align-items-center'>
                      <div className='d-flex justify-content-start flex-column'>
                        <span className='text-white fw-bolder text-hover-secondary fs-8'>
                          {item.notes}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}

                <tr>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='d-flex justify-content-start flex-column'>
                        <span className='text-white fw-bolder text-hover-secondary fs-8'>
                          Credit Rollover (Excess over 25K)
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span  className='text-white fw-bolder text-hover-secondary fs-8'>
                      <div>up to $25K - $1 = 1 Credits</div>
                      <br />
                      <div>25K to $75K- $1 = 1 Credits</div>
                      <br />
                      <div>up to $75K+ - $1 = 0 Credits</div>
                    </span>
                  </td>
                  <td className='d-flex align-items-center'>
                    <div className='d-flex justify-content-start flex-column'>
                      <span className='text-white fw-bolder text-hover-secondary fs-8'>
                        Points are valid for 3 years from when they are earned
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>

              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>
    </div>
  )
}

export {MembershipCreditsWidget}
