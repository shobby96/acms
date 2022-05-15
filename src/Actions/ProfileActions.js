import {
  ACTION_GET_PROFILE,
  ACTION_RESET_UPDATE_PROFILE_STATE,
  ACTION_UPDATE_USER_PROFILE,
} from "./Constants";

export const getProfileDetails = (url, headers) => {
  return {
    type: ACTION_GET_PROFILE,
    payload: {
      url: url,
      headers: headers,
    },
  };
};

export const updateUserProfile = (url, requestBody, headers) => {
  return {
    type: ACTION_UPDATE_USER_PROFILE,
    payload: {
      url: url,
      requestBody: requestBody,
      headers: headers,
    },
  };
};

export const resetUpdateProfileState = (url, requestBody, headers) => {
  return {
    type: ACTION_RESET_UPDATE_PROFILE_STATE,
    payload: {
      loadingStatus: {
        updateProfileLoading: false,
      },
      successObject: {
        updateProfile: {},
      },
    },
  };
};
