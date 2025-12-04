import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className="stat-card">
      <div className="stat-card__content">
        <div className="stat-card__icon" />
        <div className="stat-card__label">{label}</div>
        <div className="stat-card__value">{value}</div>
      </div>
    </div>
  );
};

interface ManageMemberStatsProps {
  totalMembers: number;
  activeMembers: number;
  electiMembers: number;
  newMembers: number;
}

export const ManageMemberStats: React.FC<ManageMemberStatsProps> = ({
  totalMembers,
  activeMembers,
  electiMembers,
  newMembers,
}) => {
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US');
  };

  return (
    <div className="member-stats">
      <StatCard 
        label="Total Members" 
        value={formatNumber(totalMembers)} 
      />
      <StatCard 
        label="Active Members" 
        value={formatNumber(activeMembers)} 
      />
      <StatCard 
        label="Electi ∞" 
        value={formatNumber(electiMembers)} 
      />
      <StatCard 
        label="New Members" 
        value={formatNumber(newMembers)} 
      />
    </div>
  );
};