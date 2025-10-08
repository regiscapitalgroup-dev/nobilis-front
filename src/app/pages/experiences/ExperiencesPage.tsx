import { FC, useState, useEffect } from "react";
import { ExperienceModel } from "./models/ExperienceModel";
import ExperienceTabs, { ExperienceTabType } from "./components/ExperienceTabs";
import { getExperiences } from "../../services/experiencesService";
import RequestsTab from "./components/tabs/RequestsTab";
import ActiveTab from "./components/tabs/ActiveTab";

const ExperiencesPage: FC = () => {
  const [experiences, setExperiences] = useState<ExperienceModel[]>([]);
  const [activeTab, setActiveTab] = useState<ExperienceTabType>("requests");

  useEffect(() => {
    getExperiences().then(setExperiences);
  }, []);

  return (
    <div className="nb-experiences">
      {/* Header */}
      <div className="nb-experiences__header">
        <h1 className="nb-experiences__title">My Experiences</h1>
        <div className="nb-experiences__actions">
          <button className="nb-btn nb-btn--dark">
            <span>HOST EXPERIENCE</span>
            <svg width="12" height="3" viewBox="0 0 12 3" fill="none">
              <path
                d="M0 1.5h10m0 0L8.5 0m1.5 1.5L8.5 3"
                stroke="white"
                strokeWidth="1"
              />
            </svg>
          </button>
          <button className="nb-btn nb-btn--outline">
            <span>SUGGEST EXPERIENCE</span>
            <svg width="12" height="3" viewBox="0 0 12 3" fill="none">
              <path
                d="M0 1.5h10m0 0L8.5 0m1.5 1.5L8.5 3"
                stroke="#151515"
                strokeWidth="1"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <ExperienceTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        requestCount={2}
      />

      {/* Tab content */}
      {activeTab === "requests" && (
        <RequestsTab experiences={experiences} />
      )}
      {activeTab === "active" && <ActiveTab experiences={experiences} />}
    </div>
  );
};

export default ExperiencesPage;
