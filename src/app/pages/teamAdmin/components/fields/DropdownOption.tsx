import React, { FC } from 'react';
import { TeamModel } from '../../models/TeamModel';
import { KTSVG } from '../../../../../_metronic/helpers';

interface DropdownProps {
  item: TeamModel;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const DropdownOption: FC<DropdownProps> = ({ item, onEdit, onDelete }) => {
  return (
    <div className="team-admin-actions">
      <button
        type="button"
        className="btn btn-icon btn-sm btn-light"
        data-kt-menu="true"
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-end"
      >
        <KTSVG path="/media/svg/nobilis/dots-horizontal.svg" />
      </button>

      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded
                   menu-gray-800 menu-state-bg-light-primary fw-semibold fs-7
                   w-150px py-4"
        data-kt-menu="true"
      >
        <div className="menu-item px-3" onClick={() => onEdit(item.id)}>
          <a className="menu-link px-3">Edit</a>
        </div>
        <div className="menu-item px-3" onClick={() => onDelete(item.id)}>
          <a className="menu-link px-3">Remove</a>
        </div>
      </div>
    </div>
  );
};

export default DropdownOption;
