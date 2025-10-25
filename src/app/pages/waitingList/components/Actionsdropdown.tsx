import React, { FC } from 'react';

interface ActionsDropdownProps {
  onAccept: () => void;
  onReject: () => void;
}

const ActionsDropdown: FC<ActionsDropdownProps> = ({ onAccept, onReject }) => {
  return (
    <div
      className="actions-dropdown"
      data-kt-menu="true"
    >
     {/*  <div className="actions-dropdown__header">
        <div className="actions-dropdown__title">Actions</div>
      </div> */}

      <div className="actions-dropdown__separator"></div>

      <div className="actions-dropdown__item">
        <button onClick={onAccept} className="actions-dropdown__link">
          Accept
        </button>
      </div>

      <div className="actions-dropdown__item">
        <button onClick={onReject} className="actions-dropdown__link">
          Reject
        </button>
      </div>
    </div>
  );
};

export default ActionsDropdown;