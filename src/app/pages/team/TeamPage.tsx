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

  const mockMembers: TeamModel[] = [
    {
      id: "1",
      name: "John",
      surname: "Doe",
      email: "john.doe@email.com",
      phone: "+87 3173 1361",
      relation: "Personal Assistant",
      organization: "Organization",
      active: true,
      assignments: ["General Administrator", "Profile Management", "Experience Management"],
    },
    {
      id: "2",
      name: "Maria",
      surname: "Gonzalez",
      email: "maria.g@email.com",
      phone: "+52 5566 8899",
      relation: "Executive Agent",
      organization: "Nobilis Intl",
      active: false,
      assignments: ["Profile Management", "Mastermind Circle Management"],
    },
    {
      id: "3",
      name: "Alex",
      surname: "Smith",
      email: "alexsmith@email.com",
      phone: "+1 408 221 7744",
      relation: "Coordinator",
      organization: "Nobilis HQ",
      active: true,
      assignments: ["Calendar Management", "Experience Management"],
    },
  ];

  useEffect(() => {
    // solo para demo
    setMembers(mockMembers);
  }, []);


  const handleCreate = async (values: Partial<TeamModel>) => {
    await createUserTeam(values as TeamModel);
   /*  await loadMembers(); */
   setMembers((prev) => [...prev, values as TeamModel]);
    setShowForm(false);
  };

  

  return (
    <div className="team-page">
      <div className="team-page__container">
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
    </div>
  );
  
};

export default TeamPage;
