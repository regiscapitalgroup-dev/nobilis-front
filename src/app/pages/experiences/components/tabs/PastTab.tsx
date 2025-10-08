import { FC } from "react";
import { ExperienceModel } from "../../models/ExperienceModel";
import ExperienceCard from "../ExperienceCard";

interface Props {
  experiences: ExperienceModel[];
}

const PastTab: FC<Props> = ({ experiences }) => {
  const filtered = experiences.filter((exp) => exp.category === "past");

  if (filtered.length === 0) {
    return (
      <p className="experiences__no-results">
        No past experiences to show.
      </p>
    );
  }

  return (
    <div className="experiences-list">
      {filtered.map((exp) => (
        <ExperienceCard key={exp.id} experience={exp} variant="past" />
      ))}
    </div>
  );
};

export default PastTab;
