import React from 'react'
import {KTSVG} from '../../../../_metronic/helpers'

const NoMembershipsFound: React.FC = () => {
  return (
    <div className='card text-center py-20'>
      <div className='card-body'>
        <KTSVG
          path='/media/icons/duotune/general/gen004.svg'
          className='svg-icon-3x mb-5 text-gray-500'
        />
        <h2 className='fw-bold text-gray-700'>No memberships available</h2>
        <p className='text-muted fs-6'>
          No memberships have been created yet. Please come back later or contact the
          administrator.
        </p>
      </div>
    </div>
  )
}

export default NoMembershipsFound
