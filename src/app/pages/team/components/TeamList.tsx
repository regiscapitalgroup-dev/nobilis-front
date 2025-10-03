import { FC } from "react";
import { TeamModel } from "../models/TeamModel";

interface Props {
  members: TeamModel[];
  onAdd: () => void;
  onEdit: (id: string) => void;
  onArchive: (id: string) => void;
}

const TeamList: FC<Props> = ({ members, onAdd, onEdit, onArchive }) => {
  return (
    <div className="team-list">
      <div className="team-list__header">
        <div className="team-list__title">My Team</div>
        <div className="team-list__subtitle">
          You can manage your Nobilis profile personally or invite trusted
          individuals—such as personal assistants, agents, or activity
          coordinators—to help. Assign them specific responsibilities like
          updating your profile, managing experiences, or handling requests.
          <br />
          Each team member will receive their own login with limited platform
          access—they will only see and manage the tasks you’ve assigned to
          them. Their profiles will remain hidden from other members, and you
          maintain full control over your account and visibility.
        </div>
      </div>

      {members.length === 0 ? (
        <div className="team-list__empty">
          <p>You have no team members yet, add them now</p>
          <button className="team-list__btn team-list__btn--primary" onClick={onAdd}>
            Add Manager
          </button>
        </div>
      ) : (
        <div className="team-list__content">
          <button className="team-list__btn team-list__btn--primary" onClick={onAdd}>
            Add Manager
          </button>

          {members.map((member) => (
            <div key={member.id} className="team-list__card">
              <div className="team-list__card-header">
                <div>
                  <div className="team-list__name">
                    {member.name} {member.surname}
                  </div>
                  <div className="team-list__details">
                    <span>{member.email}</span> | <span>{member.phone}</span> |{" "}
                    <span>{member.relation}</span> |{" "}
                    <span>{member.organization}</span>
                  </div>
                </div>
                <div className={`team-list__status ${member.active ? "active" : "inactive"}`} />
              </div>

              <div className="team-list__card-footer">
                <div className="team-list__assignments">
                  Assignment: {member.assignments.join(", ")}
                </div>
                <div className="team-list__actions">
                  <button onClick={() => onEdit(member.id)}>✏️</button>
                  <button onClick={() => onArchive(member.id)}>🗑</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamList;
