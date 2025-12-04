import React from 'react';
import { ManageMemberButton } from './ManageMemberButton';

export interface Tab {
  id: string;
  label: string;
  badge?: number;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onCreateRecord?: () => void;
}

export const ManageMemberTabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  onCreateRecord,
}) => {
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px'}}>
      <div className="tab-navigation">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-navigation__item ${
              activeTab === tab.id ? 'tab-navigation__item--selected' : ''
            }`}
            onClick={() => onTabChange(tab.id)}
            data-selected={activeTab === tab.id ? 'on' : 'off'}
            data-show-icon={tab.badge !== undefined ? 'true' : 'false'}
          >
            <div className="tab-navigation__label">{tab.label}</div>
            {tab.badge !== undefined && tab.badge > 0 && (
              <div className="tab-navigation__badge" data-property-1="regular">
                <div className="tab-navigation__badge-text">{tab.badge}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {onCreateRecord && (
        <ManageMemberButton
          label="Create Record"
          onClick={onCreateRecord}
          icon="calendar-edit"
          variant="outline"
        />
      )}
    </div>
  );
};