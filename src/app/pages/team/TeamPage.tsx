import { FC, useEffect, useState } from "react";
import { TeamModel } from "./models/TeamModel";
import { createUserTeam, getUserTeam } from "../../services/teamService";
import TeamForm from "./components/TeamForm";
import TeamList from "./components/TeamList";


const TeamPage: FC = () => {
  const [members, setMembers] = useState<TeamModel[]>([]);
  const [showForm, setShowForm] = useState(false);

  const loadMembers = async () => {
    const data = await getUserTeam();
    setMembers(data);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleCreate = async (values: Partial<TeamModel>) => {
    await createUserTeam(values as TeamModel);
    await loadMembers();
    setShowForm(false);
  };

  return (
    <div>
      {showForm ? (
        <TeamForm
          initialValues={{}}
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <TeamList
          members={members}
          onAdd={() => setShowForm(true)}
          onEdit={(id) => console.log("Edit:", id)}
          onArchive={(id) => console.log("Archive:", id)}
        />
      )}
    </div>
  );
};

export default TeamPage;
