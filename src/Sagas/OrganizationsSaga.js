import { put, call } from "redux-saga/effects";
import { updateSessionStatus } from "../Actions/AuthenticationActions";
import {
  ACTION_ADD_ORGANIZATION_FAILED,
  ACTION_ADD_ORGANIZATION_SUCCESS,
  ACTION_UPDATE_ADD_ORGANIZATION_UI_STATE,
  ACTION_UPDATE_GET_ORGANIZATION_UI_STATE,
  ACTION_GET_ORGANIZATION_FAILED,
  ACTION_GET_ORGANIZATION_SUCCESS,
  ACTION_UPDATE_ADD_USER_UI_STATE,
  ACTION_ADD_USER_SUCCESS,
  ACTION_ADD_USER_FAILED,
  ACTION_UPDATE_GET_USERS_UI_STATE,
  ACTION_GET_USERS_SUCCESS,
  ACTION_GET_USERS_FAILED,
  ACTION_UPDATE_ORGANIZATION_INFO_UI_STATE,
  ACTION_UPDATE_ORGANIZATION_INFO_SUCCESS,
  ACTION_UPDATE_ORGANIZATION_INFO_FAILED,
} from "../Actions/Constants";
import {
  updatePauseUsersInfiniteScrollState,
  updateUsersPaginationState,
} from "../Actions/OrganizationsActions";
import api from "../Services/api";

export function* addOrganizationRequestAsync({ payload }) {
  yield put({
    type: ACTION_UPDATE_ADD_ORGANIZATION_UI_STATE,
    payload: {
      loadingStatus: {
        addOrganizationLoading: true,
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
      type: ACTION_ADD_ORGANIZATION_SUCCESS,
      payload: {
        addOrganizationState: response.data,
        loadingStatus: {
          addOrganizationLoading: false,
        },
        successObject: {
          addOrganization: { message: "Signed in successfully" },
        },

        errorObject: {
          addOrganization: {},
        },
      },
    });
  } catch (error) {
    // Updates Validity of auth token
    let errorObject;
    if (error.response)
      errorObject = error.response.data.error
        ? { addOrganization: { message: error.response.data.error } }
        : { addOrganization: { message: "Login failed" } };
    else errorObject = { addOrganization: { message: error.message } };
    if (error.response && error.response.data === "Unauthorized") {
      yield put(updateSessionStatus(false));
    }
    yield put({
      type: ACTION_ADD_ORGANIZATION_FAILED,
      payload: {
        errorObject: errorObject,
        loadingStatus: {
          addOrganizationLoading: false,
        },
      },
    });
  }
}

export function* getOrganizationAsync({ payload }) {
  yield put({
    type: ACTION_UPDATE_GET_ORGANIZATION_UI_STATE,
    payload: {
      loadingStatus: {
        getOrganizationLoading: true,
      },
    },
  });

  let response;
  try {
    response = yield call(api.get, payload.url, payload.headers);

    yield put({
      type: ACTION_GET_ORGANIZATION_SUCCESS,
      payload: {
        getOrganizationState: response.data,
        loadingStatus: {
          getOrganizationLoading: false,
        },
        successObject: {
          getOrganizationSuccess: {
            message: "Organization details fetched successfully",
          },
        },
        errorObject: {
          getOrganizationSuccess: {},
        },
      },
    });
  } catch (error) {
    let errorObject;
    if (error.response)
      errorObject = error.response.data.error
        ? { getOrganizationSuccess: { message: error.response.data.error } }
        : {
            getOrganizationSuccess: { message: "Failed to fetch organization" },
          };
    else errorObject = { getOrganizationSuccess: { message: error.message } };
    if (error.response && error.response.data === "Unauthorized") {
      yield put(updateSessionStatus(false));
    }
    yield put({
      type: ACTION_GET_ORGANIZATION_FAILED,
      payload: {
        errorObject: errorObject,
        loadingStatus: {
          getOrganizationLoading: false,
        },
      },
    });
  }
}

export function* addUserAsync({ payload }) {
  yield put({
    type: ACTION_UPDATE_ADD_USER_UI_STATE,
    payload: {
      loadingStatus: {
        addUserLoading: true,
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
      type: ACTION_ADD_USER_SUCCESS,
      payload: {
        addUserState: response.data,
        loadingStatus: {
          addUserLoading: false,
        },
        successObject: {
          addUser: {
            message: "User has been sent a confirmation email",
          },
        },
        errorObject: {
          addUser: {},
        },
      },
    });
  } catch (error) {
    let errorObject;
    if (error.response) {
      errorObject = error.response.data.error
        ? { addUser: { message: error.response.data.error } }
        : { addUser: { message: "An error occurred" } };
    } else errorObject = { addUser: { message: error.message } };
    if (error.response && error.response.data === "Unauthorized") {
      yield put(updateSessionStatus(false));
    }
    yield put({
      type: ACTION_ADD_USER_FAILED,
      payload: {
        loadingStatus: { addUserLoading: false },
        errorObject: errorObject,
      },
    });
  }
}

export function* getUsersAsync({ payload }) {
  yield put({
    type: ACTION_UPDATE_GET_USERS_UI_STATE,
    payload: {
      loadingStatus: {
        getUsersLoading: true,
      },
    },
  });
  let response = {};
  let hasMore = true;

  try {
    if (payload.hasMore)
      response = yield call(api.get, payload.url, payload.headers);

    if (!response || !response.data || !response.data.users.length) {
      response.data.users = [];
      hasMore = false;
      yield put(
        updateUsersPaginationState(payload.offset, payload.limit, hasMore)
      );
    }
    yield put({
      type: ACTION_GET_USERS_SUCCESS,
      payload: {
        getUsersState: response.data.users,
        loadingStatus: {
          getUsersLoading: false,
        },
        successObject: {
          getUsers: { messsage: "Users fetched successfully" },
        },
        errorObject: {
          getUsers: {},
        },
      },
    });
    yield put(
      updateUsersPaginationState(
        payload.offset + response.data.users.length,
        payload.limit,
        hasMore
      )
    );
    yield put(updatePauseUsersInfiniteScrollState(false));
  } catch (error) {
    let errorObject;
    if (error.response) {
      errorObject = error.response.data.error
        ? { getUsers: { message: error.response.data.error } }
        : { getUsers: { message: "Failed to fetch organization" } };
    } else errorObject = { getUsers: { message: error.message } };

    if (error.response && error.response.data === "Unauthorized") {
      yield put(updateSessionStatus(false));
    }
    yield put(updateUsersPaginationState(payload.limit, payload.offset, false));
    yield put({
      type: ACTION_GET_USERS_FAILED,
      payload: {
        errorObject: errorObject,
        loadingStatus: {
          getUsersLoading: false,
        },
      },
    });
  }
}

export function* updateOrganizationInfoAsync({ payload }) {
  yield put({
    type: ACTION_UPDATE_ORGANIZATION_INFO_UI_STATE,
    payload: {
      loadingStatus: {
        updateOrganizationInfoLoading: true,
      },
      successObject: {
        updateOrganizationInfo: {},
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
      type: ACTION_UPDATE_ORGANIZATION_INFO_SUCCESS,
      payload: {
        getOrganizationState: response.data,
        loadingStatus: {
          updateOrganizationInfoLoading: false,
        },
        successObject: {
          updateOrganizationInfo: {
            message: "Organization info has been updated successfully.",
          },
        },
        errorObject: {
          updateOrganizationInfo: {},
        },
      },
    });
  } catch (error) {
    let errorObject;
    if (error.response) {
      errorObject = error.response.data.error
        ? { updateOrganizationInfo: { message: error.response.data.error } }
        : { updateOrganizationInfo: { message: "An error occurred" } };
    } else errorObject = { updateOrganizationInfo: { message: error.message } };
    if (error.response && error.response.data === "Unauthorized") {
      yield put(updateSessionStatus(false));
    }
    yield put({
      type: ACTION_UPDATE_ORGANIZATION_INFO_FAILED,
      payload: {
        loadingStatus: { updateOrganizationInfoLoading: false },
        errorObject: errorObject,
      },
    });
  }
}
