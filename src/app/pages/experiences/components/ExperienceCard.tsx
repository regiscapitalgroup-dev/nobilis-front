import { FC, useState, useRef, useEffect } from "react";
import { ExperienceModel } from "../models/ExperienceModel";
import GuestsDropdown from "./GuestsDropdown";

interface Props {
  experience: ExperienceModel;
  variant?: "requests" | "active" | "past";
}

const ExperienceCard: FC<Props> = ({ experience, variant = "requests" }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="nb-experience-card">
      <div className="nb-experience-card__wrapper">
        {/* IMAGEN */}
        <div className="nb-experience-card__image">
          <img src={experience.imageUrl} alt={experience.title} />
          <div className="nb-experience-card__image-gradient">
            <h3>{experience.title}</h3>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="nb-experience-card__content">
          {/* Header */}
          <div className="nb-experience-card__header">
            <div className="nb-experience-card__left">
              <div className="nb-experience-card__host">
                <img src={experience.hostAvatar} alt={experience.hostName} />
                <span className="nb-experience-card__host-name">
                  {experience.hostName}
                </span>
              </div>

              {/* Guests con menú */}
              <div
                className="nb-experience-card__guests-info"
                ref={dropdownRef}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="4.08" r="2.91" stroke="#151515" strokeWidth="1" />
                  <path
                    d="M1.99 12.83c0-2.26 1.83-4.08 4.09-4.08h1.84c2.26 0 4.09 1.82 4.09 4.08"
                    stroke="#151515"
                    strokeWidth="1"
                  />
                </svg>
                <span>{experience.guests} Guests</span>

                {/* Dropdown */}
                <GuestsDropdown isOpen={isDropdownOpen} />
              </div>
            </div>

            <div className="nb-experience-card__right">
              <p className="nb-experience-card__date">{experience.date}</p>
              <div className="nb-experience-card__time-left">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.83" stroke="#151515" strokeWidth="1" />
                  <path d="M7 4.38v4.47l2.38-2.09" stroke="#151515" strokeWidth="1" />
                </svg>
                <span>{experience.daysLeft} days left to accept</span>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="nb-experience-card__info">
            <div className="nb-experience-card__info-row">
              <span className="nb-experience-card__label">TOPIC</span>
              <span className="nb-experience-card__value">
                {experience.topic}
              </span>
            </div>
            <div className="nb-experience-card__info-row">
              <span className="nb-experience-card__label">MESSAGE</span>
              <div className="nb-experience-card__message">
                <p>{experience.message}</p>
                <button className="nb-experience-card__readmore">
                  READ MORE
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="nb-experience-card__actions">
            <button className="nb-btn nb-btn--outline">REJECT</button>
            <button className="nb-btn nb-btn--dark">
              ACCEPT
              <svg width="12" height="3" viewBox="0 0 12 3" fill="none">
                <path
                  d="M0 1.5h10m0 0L8.5 0m1.5 1.5L8.5 3"
                  stroke="white"
                  strokeWidth="1"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
