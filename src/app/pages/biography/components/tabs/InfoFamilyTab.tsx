import React from 'react';

const InfoFamilyTab = () => {
  return (
    <div className="family-card">
      {/* Title */}
      <div className="section">
        <h3 className="section-title">Family Relations</h3>
      </div>

      {/* Partner */}
      <div className="partner">
        <span className="field-label">Life Partner / Spouse</span>
        <span className="field-value">Hannah Rostchild</span>
      </div>

      {/* Relatives */}
      <div className="relatives">
        <span className="relatives-label">Relatives</span>

        <div className="relative-item">
          <div className="relative-info">
            <span className="relative-name">Zara Chen</span>
            <span className="relative-birth">Born in 2024</span>
          </div>
          <span className="relative-type">Children</span>
        </div>

        <div className="relative-item">
          <div className="relative-info">
            <span className="relative-name">Elara Vivienne</span>
            <span className="relative-birth">Born in 2022</span>
          </div>
          <span className="relative-type">Children</span>
        </div>

        <div className="relative-item">
          <div className="relative-info">
            <span className="relative-name">Mila Reynolds</span>
            <span className="relative-birth">Born in 2022</span>
          </div>
          <span className="relative-type">Mother</span>
        </div>

        <div className="relative-item">
          <div className="relative-info">
            <span className="relative-name">Jasper Orion</span>
            <span className="relative-birth">Born in 2021</span>
          </div>
          <span className="relative-type">Father</span>
        </div>

        <div className="relative-item">
          <div className="relative-info">
            <span className="relative-name">Lyra Mae</span>
            <span className="relative-birth">Born in 2023</span>
          </div>
          <span className="relative-type">Sister</span>
        </div>
      </div>
    </div>
  );
};

export default InfoFamilyTab;
