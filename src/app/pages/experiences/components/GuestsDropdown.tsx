import { FC } from "react";

interface Props {
  isOpen: boolean;
}

const GuestsDropdown: FC<Props> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="nb-guests-dropdown">
      <div className="nb-guests-dropdown__group">
        <span className="nb-guests-dropdown__label">Adult</span>
        <span className="nb-guests-dropdown__value">6 guests</span>
      </div>
      <div className="nb-guests-dropdown__group">
        <span className="nb-guests-dropdown__label">7–12 Years Old</span>
        <span className="nb-guests-dropdown__value">4 guests</span>
      </div>
      <div className="nb-guests-dropdown__group">
        <span className="nb-guests-dropdown__label">12+ Years Old</span>
        <span className="nb-guests-dropdown__value">2 guests</span>
      </div>
    </div>
  );
};

export default GuestsDropdown;
