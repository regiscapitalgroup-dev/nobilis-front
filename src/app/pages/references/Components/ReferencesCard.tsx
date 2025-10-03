import { FC, useEffect, useState } from "react";
import { QualificationModel } from "../models/ReferencesModel";
import { getQualifications, mockQualifications } from "../../../services/referencesService";

const ReferencesCard: FC = () => {
  const [qualifications, setQualifications] = useState<QualificationModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQualifications();
        setQualifications(data);
      } catch (err) {
        console.warn("⚠️ Using mock qualifications:", err);
        setQualifications(mockQualifications);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="references-card">
      {qualifications.map((q) => (
        <div key={q.id} className="references-card__item">
          {q.description}
        </div>
      ))}
    </div>
  );
};

export default ReferencesCard;
