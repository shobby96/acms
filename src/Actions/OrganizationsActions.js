import {
  ACTION_ADD_ORGANIZATION,
  ACTION_GET_ORGANIZATION,
  ACTION_ADD_USER,
  ACTION_GET_USERS,
  ACTION_UPDATE_USERS_PAGINATION_STATE,
  UPDATE_STOP_CALLBACK_HELL_STATE,
  ACTION_UPDATE_PAUSE_USERS_INFINITE_CALLBACK_STATE,
  ACTION_RESET_ADD_USER_SUCCESS_STATE,
  ACTION_UPDATE_ORGANIZATION_INFO,
  ACTION_RESET_USERS_REDUCER_STATE,
  ACTION_RESET_UPDATE_ORGANIZATION_STATE,
} from "./Constants";

export function addOrganization(url, requestBody, headers = {}) {
  return {
    type: ACTION_ADD_ORGANIZATION,
    payload: {
      kind: "post",
      url: url,
      requestBody: requestBody,
      headers: headers,
    },
  };
}

export function getOrganization(url, headers = {}) {
  return {
    type: ACTION_GET_ORGANIZATION,
    payload: {
      kind: "get",
      url: url,
      headers: headers,
    },
  };
}

export function addUser(url, requestBody, headers = {}) {
  return {
    type: ACTION_ADD_USER,
    payload: {
      kind: "post",
      url: url,
      requestBody: requestBody,
      headers: headers,
    },
  };
}

export function resetAddUserSuccessState() {
  return {
    type: ACTION_RESET_ADD_USER_SUCCESS_STATE,
    payload: {
      successObject: {
        addUser: {},
      },
    },
  };
}

export function getUsers(
  url,
  headers = {},
  limit = 10,
  offset = 0,
  hasMore = false
) {
  return {
    type: ACTION_GET_USERS,
    payload: {
      kind: "get",
      url: url,
      headers: headers,
      offset: offset,
      limit: limit,
      hasMore: hasMore,
    },
  };
}

export function updateUsersPaginationState(
  offset = 0,
  limit = 10,
  hasMore = false
) {
  return {
    type: ACTION_UPDATE_USERS_PAGINATION_STATE,
    payload: {
      offset: offset,
      limit: limit,
      hasMore: hasMore,
    },
  };
}

export function updatePauseInfiniteScrollState(
  pauseInfiniteScrollCallback = false
) {
  return {
    type: UPDATE_STOP_CALLBACK_HELL_STATE,
    payload: {
      pauseInfiniteScrollCallback: pauseInfiniteScrollCallback,
    },
  };
}

export function updatePauseUsersInfiniteScrollState(
  pauseUsersInfiniteScrollCallback = false
) {
  return {
    type: ACTION_UPDATE_PAUSE_USERS_INFINITE_CALLBACK_STATE,
    payload: {
      pauseUsersInfiniteScrollCallback: pauseUsersInfiniteScrollCallback,
    },
  };
}

export function putOrganizationInfo(url, requestBody, headers) {
  return {
    type: ACTION_UPDATE_ORGANIZATION_INFO,
    payload: {
      url: url,
      requestBody: requestBody,
      headers: headers,
    },
  };
}

export function resetUsersReducerState() {
  return {
    type: ACTION_RESET_USERS_REDUCER_STATE,
    payload: {
      getUsersState: [],
      getUsersQueryStringParameters: {
        limit: 10,
        offset: 0,
        hasMore: true,
      },
      loadingStatus: {
        getUsersLoading: false,
      },
      successObject: {
        getUsers: {},
      },
    },
  };
}

export function resetUpdateOrganizationState() {
  return {
    type: ACTION_RESET_UPDATE_ORGANIZATION_STATE,
    payload: {
      loadingStatus: {
        updateOrganizationInfoLoading: false,
      },
      successObject: {
        updateOrganizationInfo: {},
      },
    },
  };
}
