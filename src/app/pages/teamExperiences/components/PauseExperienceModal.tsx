import React from "react";
import { KTSVG } from "../../../../_metronic/helpers";

type Props = {
  open: boolean;
  message?: string;
  onClose: (close:boolean) => void;
  onPause: () => void;
};

export function PauseExperienceModal({ open, onClose, onPause }: Props) {
  if (!open) return null;

  return (
    <div className="tap-experience-nb-modal-overlay">
      <div className="tap-experience-nb-modal-container tap-flex-center flex-column">
        <h2 className="tap-experience-nb-modal-title">Pause experience</h2>
        <p className="tap-experience-nb-modal-text">
          You may pause your experience at any time, making it invisible to members until you choose to unpause. However, any committed dates must still be honored—if even one guest has booked, the experience must proceed as planned.
        </p>
        <div className="w-100 d-flex flex-row align-items-center justify-content-between">
          <button type="button" className="tap-add-experience-2-btn-secondary" onClick={()=>onClose(false)}>
              Cancel
          </button>
          <button type="button" className="tap-add-experience-2-btn-main tap-flex-center" onClick={onPause}>
              <span>Pause Experience</span>
              &nbsp;<KTSVG path='/media/svg/nobilis/teams_and_partner/waitlist_nb_btn_icon_host_experience_btn.svg' />
          </button>
        </div>
      </div>
    </div>
  );
}
