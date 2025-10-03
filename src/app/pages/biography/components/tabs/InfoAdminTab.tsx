import React from 'react';

const InfoAdminTab = () => {
  return (
    <div className="info-card bio-tabs__panel">
      {/* General Information */}
      <div className="section">
        <h3 className="section-title">General Information</h3>
        <div className="section-content">
          <div className="field">
            <span className="field-label">Date of birth</span>
            <span className="field-value">18 August 1973</span>
          </div>
          <div className="field">
            <span className="field-label">Phone</span>
            <span className="field-value">+578 23728137</span>
          </div>
          <div className="field">
            <span className="field-label">E-mail</span>
            <span className="field-value">fredrick123@gmail.com</span>
          </div>
          <div className="field">
            <span className="field-label">Preferred Contact Method</span>
            <span className="field-value">Email, Phone</span>
          </div>
        </div>
      </div>

      {/* Postal Address */}
      <div className="section">
        <h3 className="section-title">Postal Address</h3>
        <div className="address-card">
          <div className="address-block">
            <span className="address-label">Postal Address</span>
            <div className="address-value">
              <p>927 Park Avenue, NY 10028</p>
              <p className="muted">New York, United States</p>
            </div>
          </div>

          <div className="address-block">
            <span className="address-label">Primary residence</span>
            <div className="address-value">
              <p>New York, United States</p>
            </div>
          </div>

          <div className="address-block">
            <span className="address-label">Often in</span>
            <div className="address-value">
              <p>New York, United States</p>
              <p>Los Angeles, United States</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoAdminTab;
