import React from 'react';
import { useUserProfileContext } from '../../../../context/UserProfileContext';

const InfoFamilyTab = () => {
  const { data } = useUserProfileContext();

  const relatives = data?.relatives ?? [];

  return (
    <div className="family-card">
      {/* Title */}
      <div className="section">
        <h3 className="section-title">Family Relations</h3>
      </div>

      {/* Partner */}
      <div className="partner">
        <span className="field-label">Life Partner / Spouse</span>
        <span className="field-value">
          {`${data?.lifePartnerName ?? ""} ${data?.lifePartnerLastname ?? ""}`|| 'Not specified'}
        </span>
      </div>

      {/* Relatives */}
      <div className="relatives">
        <span className="relatives-label">Relatives</span>

        {relatives.length > 0 ? (
          relatives.map((relative) => (
            <div key={relative.id} className="relative-item">
              <div className="relative-info">
                <span className="relative-name">
                  {relative.firstName} {relative.lastName}
                </span>
                <span className="relative-birth">
                  Born in {relative.yearOfBirth}
                </span>
              </div>
              <span className="relative-type">{relative.relationship}</span>
            </div>
          ))
        ) : (
          <p className="no-relatives">No relatives added yet.</p>
        )}
      </div>
    </div>
  );
};

export default InfoFamilyTab;
