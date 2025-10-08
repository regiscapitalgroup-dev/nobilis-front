import { FC } from "react";
import { ExperienceModel } from "../../models/ExperienceModel";
import ExperienceCard from "../ExperienceCard";

interface Props {
  experiences: ExperienceModel[];
}

const RequestsTab: FC<Props> = ({ experiences }) => {
  const filtered = experiences.filter((exp) => exp.category === "requests");

  return (
    <div className="nb-experiences__list">
      {filtered.map((exp) => (
        <ExperienceCard key={exp.id} experience={exp} variant="requests" />
      ))}

      {filtered.length === 0 && (
        <p className="nb-experiences__no-results">
          No experiences available in this section.
        </p>
      )}
    </div>
  );
};

export default RequestsTab;
