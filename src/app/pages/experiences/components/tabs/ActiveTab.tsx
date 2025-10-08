import { FC } from "react";
import { ExperienceModel } from "../../models/ExperienceModel";

interface Props {
  experiences: ExperienceModel[];
}

const ActiveTab: FC<Props> = ({ experiences }) => {
  const filtered = experiences.filter((exp) => exp.category === "active");

  return (
    <div className="nb-active-tab">
      {filtered.map((exp) => (
        <div key={exp.id} className="nb-active-card">
          <div className="nb-active-card__wrapper">
            {/* IMAGE */}
            <div className="nb-active-card__image">
              <img src={exp.imageUrl} alt={exp.title} />
              <div className="nb-active-card__image-gradient">
                <div className="nb-active-card__image-title">
                  {exp.title}
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="nb-active-card__content">
              {/* HEADER */}
              <div className="nb-active-card__header">
                <div className="nb-active-card__hosts">
                  <div className="nb-active-card__host">
                    <img src={exp.hostAvatar} alt="You" />
                    <span>You</span>
                  </div>
                  <div className="nb-active-card__host">
                    <img src={exp.coHostAvatar} alt="Kristina Adam" />
                    <span>Kristina Adam</span>
                  </div>
                </div>
                <div className="nb-active-card__edit">
                  <div></div><div></div><div></div>
                </div>
              </div>

              {/* INFO */}
              <div className="nb-active-card__info">
                <div className="nb-active-card__label">Invite Only</div>

                <div className="nb-active-card__rows">
                  <div className="nb-active-card__row">
                    <div className="nb-active-card__item">
                      <div className="nb-icon nb-icon--location"></div>
                      <span>Vilnius, Lithuania</span>
                    </div>
                    <div className="nb-active-card__item">
                      <div className="nb-icon nb-icon--calendar"></div>
                      <span>30 August 2026</span>
                    </div>
                    <div className="nb-active-card__item">
                      <div className="nb-icon nb-icon--user"></div>
                      <span>Max 12 Guests</span>
                    </div>
                  </div>

                  <div className="nb-active-card__row">
                    <div className="nb-active-card__item">
                      <div className="nb-icon nb-icon--dollar"></div>
                      <span>USD 2000/Guest</span>
                    </div>
                    <div className="nb-active-card__item">
                      <div className="nb-icon nb-icon--clock"></div>
                      <span>6 Hour</span>
                    </div>
                    <div className="nb-active-card__item nb-active-card__item--hidden">
                      <div className="nb-icon"></div>
                      <span>6 Hour</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* FOOTER */}
              <div className="nb-active-card__footer">
                <div className="nb-active-card__guests">
                  <div className="nb-icon nb-icon--user"></div>
                  <span>6/12 guests</span>
                </div>
                <div className="nb-active-card__actions">
                  <div className="nb-active-card__preview">
                    <span>preview</span>
                  </div>
                  <div className="nb-active-card__invite">
                    <span>invite guests</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <p className="nb-experiences__no-results">
          No active experiences available.
        </p>
      )}
    </div>
  );
};

export default ActiveTab;
