import { put, call } from "redux-saga/effects";
import {
  ACTION_SIGN_IN_FAILED,
  ACTION_SIGN_IN_SUCCESS,
  ACTION_UPDATE_SIGN_IN_UI_STATE,
} from "../Actions/Constants";
import api from "../Services/api";

export function* signInRequestAsync({ payload }) {
  yield put({
    type: ACTION_UPDATE_SIGN_IN_UI_STATE,
    payload: {
      loadingStatus: {
        signInLoading: true,
      },
      errorObject: { signIn: {} },
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
      type: ACTION_SIGN_IN_SUCCESS,
      payload: {
        profileState: response.data,
        sessionValid: true,
        loadingStatus: {
          signInLoading: false,
        },
        successObject: {
          signIn: { message: "Signed in successfully" },
        },

        errorObject: { signIn: {} },
      },
    });
  } catch (error) {
    // Updates Validity of auth token
    let errorObject;
    if (error.response)
      errorObject = error.response.data.error
        ? { signIn: { message: error.response.data.error } }
        : { signIn: { message: "Login failed" } };
    else errorObject = { signIn: { message: error.message } };
    yield put({
      type: ACTION_SIGN_IN_FAILED,
      payload: {
        errorObject: errorObject,
        loadingStatus: {
          signInLoading: false,
        },
      },
    });
  }
}
