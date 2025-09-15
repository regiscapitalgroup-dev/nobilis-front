import { AxiosResponse } from "axios";
import apiClient from "../helpers/apiClient";
import { UserProfile } from "../pages/profile/models/ProfileModel";
import { ExperienceFooterModel } from "../../_metronic/layout/components/models/ExperienceModel";


function toUserProfileFormData(data: UserProfile): FormData {
    const fd = new FormData();


    fd.append("introduction_headline", data.introduction_headline);
    fd.append("alias_title", data.alias_title);
    fd.append("birthday", data.birthday);
    fd.append("phone_number", data.phone_number);
    fd.append("city", data.city);
    fd.append("name", data.name);
    fd.append("email", data.email);
    fd.append("preferred_phone", data.preferred_phone.toString());
    fd.append("prefered_email", data.prefered_email.toString());

    if (data.profile_picture instanceof File) {
        fd.append("profile_picture", data.profile_picture, data.profile_picture.name);
    } else if (data.profile_picture) {
        fd.append("profile_picture", data.profile_picture);
    }

    data.languages.forEach((lang, i) => {
        fd.append(`languages[${i}]`, lang);
    });

    if (data.social_media_profiles?.length) {
        data.social_media_profiles.forEach((sp, i) => {
            fd.append(`social_media_profiles[${i}][platform_name]`, sp.platform_name);
            fd.append(`social_media_profiles[${i}][profile_url]`, sp.profile_url);
        });
    }

    return fd;
}

export async function updateUserProfile(
    payload: UserProfile
) {
    const formData = toUserProfileFormData(payload);

    const { data } = await apiClient.put(`/users/profile/`, formData, {
        headers: { Accept: 'application/json' },
    });
    return data;
}

export const getProfileByUser = async () => {
    const response = await apiClient.get('/full-profile/');
    return response.data;
};

export const getUserExperiences = async (): Promise<ExperienceFooterModel[]> => {
    const response = await apiClient.get('/experiences/');
    return response.data?.results;
  };
  
  