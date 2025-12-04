import React from "react";

type Props = {
  open: boolean;
  message?: string;
  onClose: () => void;
};

export function RequiredInfoModal({ open, message, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="tap-experience-nb-modal-overlay">
      <div className="tap-experience-nb-modal-container tap-flex-center flex-column">
        <h2 className="tap-experience-nb-modal-title">Missing Required Information</h2>
        <p className="tap-experience-nb-modal-text">
          {message ?? "Please enter the required information to continue."}
        </p>
        <div className="tap-experience-nb-modal-button"  onClick={onClose}>
            <span>I UNDERSTAND</span>
        </div>
      </div>
    </div>
  );
}
