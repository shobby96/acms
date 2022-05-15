import {
  ACTION_GET_PROFILE_FAILED,
  ACTION_GET_PROFILE_SUCCESS,
  ACTION_RESET_UPDATE_PROFILE_STATE,
  ACTION_SIGN_IN_FAILED,
  ACTION_SIGN_IN_SUCCESS,
  ACTION_UPDATE_GET_PROFILE_UI_STATE,
  ACTION_UPDATE_SESSION_STATUS,
  ACTION_UPDATE_SIGN_IN_UI_STATE,
  ACTION_UPDATE_USER_PROFILE_FAILED,
  ACTION_UPDATE_USER_PROFILE_SUCCESS,
  ACTION_UPDATE_USER_PROFILE_UI_STATE,
} from "../Actions/Constants";

const initialSigninState = {
  signInState: {},
  loadingStatus: {
    signInLoading: false,
    getProfileLoading: false,
    updateProfileLoading: false,
  },
  errorObject: {
    signIn: {},
    getProfile: {},
    updateProfile: {},
  },
  successObject: {
    signIn: {},
    getProfile: {},
    updateProfile: {},
  },
  profileState: { profile: {} },
  sessionValid: true,
};

function newStateObject(state, action) {
  return {
    ...state,
    ...action.payload,
    loadingStatus: {
      ...state.loadingStatus,
      ...action.payload.loadingStatus,
    },
    successObject: {
      ...state.successObject,
      ...action.payload.successObject,
    },
    profileState: action.payload.profileState
      ? { ...state.profileState, ...action.payload.profileState }
      : { ...state.profileState },
  };
}

export const signInReducer = (state = initialSigninState, action) => {
  switch (action.type) {
    case ACTION_SIGN_IN_FAILED:
      return newStateObject(state, action);
    case ACTION_SIGN_IN_SUCCESS:
      return newStateObject(state, action);
    case ACTION_UPDATE_SIGN_IN_UI_STATE:
      return newStateObject(state, action);

    case ACTION_GET_PROFILE_FAILED:
      return newStateObject(state, action);
    case ACTION_GET_PROFILE_SUCCESS:
      return newStateObject(state, action);

    case ACTION_UPDATE_USER_PROFILE_SUCCESS:
      return newStateObject(state, action);
    case ACTION_UPDATE_USER_PROFILE_FAILED:
      return newStateObject(state, action);
    case ACTION_UPDATE_USER_PROFILE_UI_STATE:
      return newStateObject(state, action);
    // return newStateObject(state, action);
    case ACTION_UPDATE_GET_PROFILE_UI_STATE:
      return newStateObject(state, action);

    case ACTION_RESET_UPDATE_PROFILE_STATE:
      return newStateObject(state, action);

    case ACTION_UPDATE_SESSION_STATUS:
      return newStateObject(state, action);
    default:
      return {
        ...state,
      };
  }
};
