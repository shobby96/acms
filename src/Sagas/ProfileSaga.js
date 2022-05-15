import {
  ACTION_GET_PROFILE_FAILED,
  ACTION_GET_PROFILE_SUCCESS,
  ACTION_UPDATE_GET_PROFILE_UI_STATE,
  ACTION_UPDATE_USER_PROFILE_FAILED,
  ACTION_UPDATE_USER_PROFILE_SUCCESS,
  ACTION_UPDATE_USER_PROFILE_UI_STATE,
} from "../Actions/Constants";

import { put, call } from "redux-saga/effects";
import api from "../Services/api";
import { updateSessionStatus } from "../Actions/AuthenticationActions";

export function* getProfileAsync({ payload }) {
  yield put({
    type: ACTION_UPDATE_GET_PROFILE_UI_STATE,
    payload: {
      loadingStatus: {
        getProfileLoading: true,
      },
    },
  });
  let response;

  try {
    response = yield call(api.get, payload.url, payload.headers);

    yield put({
      type: ACTION_GET_PROFILE_SUCCESS,
      payload: {
        loadingStatus: {
          getProfileLoading: false,
        },
        profileState: response.data,
        successObject: {
          getProfile: { message: "Profile fetched successfully" },
        },
        errorObject: {
          getProfile: {},
        },
      },
    });
  } catch (error) {
    // Updates Validity of auth token
    let errorObject;
    if (error.response)
      errorObject = error.response.data.error
        ? { getProfile: { message: error.response.data.error } }
        : { getProfile: { message: "Login failed" } };
    else errorObject = { getProfile: { message: error.message } };
    if (error.response && error.response.data === "Unauthorized") {
      yield put(updateSessionStatus(false));
    }
    yield put({
      type: ACTION_GET_PROFILE_FAILED,
      payload: {
        errorObject: errorObject,
        loadingStatus: {
          getProfileLoading: false,
        },
      },
    });
  }
}

export function* updateUserProfileAsync({ payload }) {
  yield put({
    type: ACTION_UPDATE_USER_PROFILE_UI_STATE,
    payload: {
      loadingStatus: {
        updateProfileLoading: true,
      },
      successObject: {
        updateProfile: { message: "" },
      },
    },
  });
  let response;

  try {
    response = yield call(
      api.edit,
      payload.url,
      payload.requestBody,
      payload.headers
    );

    yield put({
      type: ACTION_UPDATE_USER_PROFILE_SUCCESS,
      payload: {
        loadingStatus: {
          updateProfileLoading: false,
        },
        profileState: response.data,
        successObject: {
          updateProfile: { message: "Profile updated successfully" },
        },
        errorObject: {
          updateProfile: {},
        },
      },
    });
  } catch (error) {
    // Updates Validity of auth token
    let errorObject;
    if (error.response)
      errorObject = error.response.data.error
        ? { updateProfile: { message: error.response.data.error } }
        : { updateProfile: { message: "Login failed" } };
    else errorObject = { updateProfile: { message: error.message } };
    if (error.response && error.response.data === "Unauthorized") {
      yield put(updateSessionStatus(false));
    }
    yield put({
      type: ACTION_UPDATE_USER_PROFILE_FAILED,
      payload: {
        errorObject: errorObject,
        loadingStatus: {
          updateProfileLoading: false,
        },
      },
    });
  }
}
