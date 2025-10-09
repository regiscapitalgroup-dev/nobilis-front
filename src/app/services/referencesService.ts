import apiClient from "../helpers/apiClient";
import { QualificationModel, ReferenceModel } from "../pages/references/models/ReferencesModel";

export const mockQualifications: QualificationModel[] = [
  { id: 1, description: "Wealth Owner - Net worth $30M+" },
  { id: 2, description: "Impact Maker - Reaching 1M+ people through recognized work in fields such as arts, music, science, technology, philanthropy, sports, etc." },
  { id: 3, description: "Beneficiary 1" },
  { id: 4, description: "Beneficiary 2" },
];

export async function createReference(payload: ReferenceModel) {

  const adaptedPayload = {
    first_name: payload.name,
    last_name: payload.surname,
    email: payload.email,
    phone_number: payload.phone,
    invitee_qualification: Number(payload.qualifications) ??  null,
  }

  const { data } = await apiClient.post(`/members/referrals/`, adaptedPayload);
  return data;
}

export async function getQualifications(): Promise<QualificationModel[]> {
  const { data } = await apiClient.get(`/references/qualifications`,);
  return data;
}

export const getQualificationsCat = async () => {
  const { data } = await apiClient.get('members/referrals/catalog/');
  return data?.results;
};  