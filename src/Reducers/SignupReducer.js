import {
  ACTION_SIGN_UP_FAILED,
  ACTION_SIGN_UP_SUCCESS,
  ACTION_UPDATE_SIGN_UP_UI_STATE,
  ACTION_CONFIRM_SIGN_UP_FAILED,
  ACTION_CONFIRM_SIGN_UP_SUCCESS,
  ACTION_UPDATE_CONFIRM_SIGN_UP_UI_STATE,
} from "../Actions/Constants";

const initialSigninState = {
  signUpState: {},
  confirmSignUpState: {},
  loadingStatus: {
    signUpLoading: false,
    confirmSignUpLoading: false,
  },
  errorObject: {
    signUp: {},
    confirmSignUp: {},
  },
  successObject: {
    signUp: {},
    confirmSignUp: {},
  },
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
  };
}

export const signUpReducer = (state = initialSigninState, action) => {
  switch (action.type) {
    case ACTION_SIGN_UP_FAILED:
      return newStateObject(state, action);
    case ACTION_SIGN_UP_SUCCESS:
      return newStateObject(state, action);
    case ACTION_UPDATE_SIGN_UP_UI_STATE:
      return newStateObject(state, action);

    case ACTION_CONFIRM_SIGN_UP_FAILED:
      return newStateObject(state, action);
    case ACTION_CONFIRM_SIGN_UP_SUCCESS:
      return newStateObject(state, action);
    case ACTION_UPDATE_CONFIRM_SIGN_UP_UI_STATE:
      return newStateObject(state, action);
    default:
      return {
        ...state,
      };
  }
};
