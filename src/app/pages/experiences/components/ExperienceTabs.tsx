import { FC, Fragment } from "react";

export type ExperienceTabType = "requests" | "active" | "past";

interface Props {
  activeTab: ExperienceTabType;
  onChange: (tab: ExperienceTabType) => void;
  requestCount?: number;
}

const ExperienceTabs: FC<Props> = ({ activeTab, onChange, requestCount = 2 }) => {
  const tabs: { label: string; type: ExperienceTabType; count?: number }[] = [
    { label: "requests", type: "requests", count: requestCount },
    { label: "active Experiences", type: "active" },
    { label: "past experiences", type: "past" },
  ];

  return (
    <div className="nb-experience-tabs">
      {tabs.map((tab, index) => (
        <Fragment key={tab.type}>
          <div
            className={`nb-experience-tabs__item ${
              activeTab === tab.type ? "active" : ""
            }`}
            onClick={() => onChange(tab.type)}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && activeTab === tab.type && (
              <div className="nb-experience-tabs__badge">
                <span>{tab.count}</span>
              </div>
            )}
          </div>
          {index < tabs.length - 1 && (
            <div className="nb-experience-tabs__separator" />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default ExperienceTabs;