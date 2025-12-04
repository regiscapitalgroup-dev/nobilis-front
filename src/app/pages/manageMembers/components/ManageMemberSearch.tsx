import React from 'react';

interface ManageMemberSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const ManageMemberSearch: React.FC<ManageMemberSearchProps> = ({ 
  value, 
  onChange, 
  placeholder = 'Search Member' 
}) => {
  return (
    <div className="search-bar">
      <div className="search-bar__icon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle 
            cx="10" 
            cy="10" 
            r="6.67" 
            stroke="#C0C0C0" 
            strokeWidth="1.5"
          />
          <path 
            d="M15.07 15.07L17.5 17.5" 
            stroke="#C0C0C0" 
            strokeWidth="1.5" 
            strokeLinecap="round"
          />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-bar__input"
      />
    </div>
  );
};