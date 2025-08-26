import React from "react";
import { KTSVG, toAbsoluteUrl } from "../../../../_metronic/helpers";

type SocialMediaOption = {
  id: string;
  name: string;
  icon: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (option: SocialMediaOption) => void;
};

export default function SocialMediaModal({ isOpen, onClose, onSelect }: Props) {
  const socialOptions = [
    { id: 'website', name: 'Website', icon: '/media/svg/nobilis/web.svg' },
    { id: 'linkedin', name: 'Linkedin', icon: '/media/svg/nobilis/lk.svg' },
    { id: 'instagram', name: 'Instagram', icon: '/media/svg/nobilis/instagram.svg' },
    { id: 'facebook', name: 'Facebook', icon: '/media/svg/nobilis/fb-black.svg' },
    { id: 'twitter', name: 'X Profile', icon: '/media/svg/nobilis/x.svg' }
  ];

  if (!isOpen) return null;

  return (
    <>
      <div className={`modal fade ${isOpen ? 'show' : ''}`} 
           style={{ display: isOpen ? 'block' : 'none' }}
           tabIndex={-1} 
           role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content social-media-modal-content">
            
            <div className="social-modal-header">
              <div className="social-modal-subtitle">Social Media & Online Presence</div>
              <div className="social-modal-title">Choose category</div>
            </div>

            <div className="social-modal-options">
              {socialOptions.map((option) => (
                <div 
                  key={option.id}
                  className="social-modal-option"
                  onClick={() => {
                    onSelect(option);
                    onClose();
                  }}
                >
                  <div className="social-modal-icon-container">
                    <KTSVG
                      path={toAbsoluteUrl(option.icon)}
                      className="social-modal-icon"
                    />
                  </div>
                  <div className="social-modal-option-text">{option.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isOpen && <div className="modal-backdrop fade show" onClick={onClose}></div>}
    </>
  );
}