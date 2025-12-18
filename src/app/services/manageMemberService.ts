import apiClient from "../helpers/apiClient";
import { ManageMemberModel } from "../pages/manageMembers/models/ManageMemberModel";

export const getSearchableManageMembers = async (search: string, activeTab: string): Promise<ManageMemberModel> => {

    const segmentMap: Record<string, string> = {
        'new-members': 'new_members',
        'create-profile': 'create_profile',
    }

    const segment = segmentMap[activeTab] || ''
    const params = new URLSearchParams()
    if (search) params.append('search', search)
    if (segment) params.append('segment', segment)

    const queryString = params.toString()
    const url = `/admin/members/${queryString ? `?${queryString}` : ''}`

    const response = await apiClient.get(url)
    return response.data
};