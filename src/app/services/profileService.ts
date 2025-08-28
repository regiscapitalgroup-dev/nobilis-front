import apiClient from "../helpers/apiClient";
import { UserProfile } from "../pages/profile/models/ProfileModel";


function toUserProfileFormData(data: UserProfile): FormData {
    const fd = new FormData();


    fd.append("introduction_headline", data.introduction_headline);
    fd.append("alias_title", data.alias_title);
    fd.append("birthday", data.birthday);
    fd.append("phone_number", data.phone_number);
    fd.append("street", data.street);
    fd.append("city", data.city);
    fd.append("postal_code", data.postal_code);

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

