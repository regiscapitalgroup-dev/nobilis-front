import apiClient from "../helpers/apiClient";
import { TeamModel } from "../pages/team/models/TeamModel";


export async function createUserTeam(
    payload: TeamModel
) {
    const { data } = await apiClient.post(`/users/team/`, payload, {
        headers: { Accept: 'application/json' },
    });
    return data;
}

export async function getUserTeam(): Promise<TeamModel[]> {
    const { data } = await apiClient.get(`/users/team/`, {
      headers: { Accept: "application/json" },
    });
    return data;
  }