import React, { FC, useEffect } from 'react';
import { MenuComponent } from '../../../../_metronic/assets/ts/components';

interface ActionsDropdownProps {
  onAccept: () => void;
  onReject: () => void;
  onDrawerOpen: () => void;
}

const ActionsDropdown: FC<ActionsDropdownProps> = ({ onAccept, onReject, onDrawerOpen }) => {
  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-200px py-4'
      data-kt-menu='true'
    >
      {/* Accept */}
      <div className='menu-item px-3'>
        <button
          onClick={onAccept}
          className='menu-link px-3'
          style={{
            background: 'white',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left'
          }}
        >
          Accept
        </button>
      </div>

      {/* Separator */}
      <div className='separator my-2'></div>

      {/* Reject */}
      <div className='menu-item px-3'>
        <button
          onClick={onReject}
          className='menu-link px-3'
          style={{
            background: 'white',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left'
          }}
        >
          Reject
        </button>
      </div>

      {/* Separator */}
      <div className='separator my-2'></div>

      {/* Request Membership */}
      <div className='menu-item px-3'>
        <button
          id='kt_drawer_request_membership_btn'
          className='menu-link px-3'
          onClick={onDrawerOpen}
          style={{
            background: 'white',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left'
          }}
        >
          Request Membership
        </button>
      </div>
    </div>
  );
};

export default ActionsDropdown;