import { put, call } from "redux-saga/effects";
import {
  ACTION_SIGN_UP_FAILED,
  ACTION_SIGN_UP_SUCCESS,
  ACTION_UPDATE_SIGN_UP_UI_STATE,
  ACTION_CONFIRM_SIGN_UP_FAILED,
  ACTION_CONFIRM_SIGN_UP_SUCCESS,
  ACTION_UPDATE_CONFIRM_SIGN_UP_UI_STATE,
} from "../Actions/Constants";
import api from "../Services/api";
export function* signUpRequestAsync({ payload }) {
  yield put({
    type: ACTION_UPDATE_SIGN_UP_UI_STATE,
    payload: {
      loadingStatus: {
        signUpLoading: true,
      },
    },
  });

  let response;

  try {
    response = yield call(
      api.add,
      payload.url,
      payload.requestBody,
      payload.headers
    );

    yield put({
      type: ACTION_SIGN_UP_SUCCESS,
      payload: {
        signUpState: response.data,
        loadingStatus: {
          signUpLoading: false,
        },
        successObject: {
          signUp: { message: "Verification code has been sent" },
        },

        errorObject: {
          signUp: {},
        },
      },
    });
  } catch (error) {
    // Updates Validity of auth token
    let errorObject;
    if (error.response)
      errorObject = error.response.data.error
        ? { signUp: error.response.data.error }
        : { signUp: { message: "Signup failed" } };
    else errorObject = { signUp: { message: error.message } };
    yield put({
      type: ACTION_SIGN_UP_FAILED,
      payload: {
        errorObject: errorObject,
        loadingStatus: {
          signUpLoading: false,
        },
      },
    });
  }
}

export function* confirmSignUpRequestAsync({ payload }) {
  yield put({
    type: ACTION_UPDATE_CONFIRM_SIGN_UP_UI_STATE,
    payload: {
      loadingStatus: {
        confirmSignUpLoading: true,
      },
    },
  });

  let response;

  try {
    response = yield call(
      api.add,
      payload.url,
      payload.requestBody,
      payload.headers
    );

    yield put({
      type: ACTION_CONFIRM_SIGN_UP_SUCCESS,
      payload: {
        confirmSignUpState: response.data,
        loadingStatus: {
          confirmSignUpLoading: false,
        },
        successObject: {
          confirmSignUp: { message: "Verification code has been sent" },
        },

        errorObject: {
          confirmSignUp: {},
        },
      },
    });
  } catch (error) {
    // Updates Validity of auth token
    let errorObject;
    if (error.response)
      errorObject = error.response.data.error
        ? { confirmSignUp: { message: error.response.data.error } }
        : { confirmSignUp: { message: "Signup failed" } };
    else errorObject = { confirmSignUp: { message: error.message } };
    yield put({
      type: ACTION_CONFIRM_SIGN_UP_FAILED,
      payload: {
        errorObject: errorObject,
        loadingStatus: {
          confirmSignUpLoading: false,
        },
      },
    });
  }
}
