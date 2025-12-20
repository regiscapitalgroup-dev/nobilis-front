import apiClient from '../helpers/apiClient'

export const updateProfile = async (data: any, memberId?: string) => {

    const url = memberId
        ? `/admin-profile/basic/${memberId}/`
        : `/admin-profile/basic/`;
    const response = await apiClient.put(url, data)
    return response.data
}

export const updateProfileProfessional = async (data: any, memberId?: string) => {
    try {
        const getYear = (value: string, isCurrent?: boolean): string => {
            if (isCurrent) return 'Present'
            if (!value) return ''
            return new Date(value).getFullYear().toString()
        }

        const payload = {
            professional_profile: {
                industries: data.industries || [],
                professional_interest: data.interests || [],
                work_positions: [
                    {
                        company: data.organization,
                        position: data.role,
                        city: data.city,
                        from_year: getYear(data.from),
                        to_year: getYear(data.to, data.currentRole),
                    },
                ],
                on_board: [
                    {
                        company: data.boardOrganization,
                        position: data.boardRole,
                        city: data.boardCity,
                        from_year: getYear(data.boardFrom),
                        to_year: getYear(data.boardTo, data.boardCurrent),
                    },
                ],
                non_profit_involvement: [
                    {
                        company: data.nonprofitOrganization,
                        position: data.nonprofitRole,
                        city: data.nonprofitCity,
                        from_year: getYear(data.nonprofitFrom),
                        to_year: getYear(data.nonprofitTo, data.nonprofitCurrent),
                    },
                ],
                education: [
                    {
                        university_name: data.eduOrganization,
                        carreer: data.eduRole,
                        city: data.eduCity,
                        from_year: getYear(data.eduFrom),
                        to_year: getYear(data.eduTo, data.eduCurrent),
                    },
                ],
            },
        }

        const url = memberId
            ? `/admin-profile/${memberId}/`
            : `/admin-profile/`;
        const response = await apiClient.patch(url, payload)

        return response.data
    } catch (error: any) {
        console.error('Error updating professional profile:', error)
        throw error
    }
}
export const updateProfilePersonal = async (data: any, memberId?: string) => {

    const payload = {
        personal_detail: {
            hobbies: data.hobbies || [],
            interests: data.interests || [],
            clubs: [
                {
                    name: data.clubName,
                    city: data.city,
                },
            ],
        },
    }

    const url = memberId
        ? `/admin-profile/${memberId}/`
        : `/admin-profile/`;
    const response = await apiClient.patch(url, payload)
    return response.data
}

export const updateProfileConfidential = async (data: any, memberId?: string) => {
    const url = memberId
        ? `/admin-profile/confidential/${memberId}/`
        : `/admin-profile/confidential/`;
    const response = await apiClient.put(url, data)
    return response.data
}