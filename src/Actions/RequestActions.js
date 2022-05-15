import {
  ACTION_ACCEPT_REQUEST,
  ACTION_DELETE_REQUEST_LOCAL,
  ACTION_GET_REQUESTS,
  ACTION_NEW_REQUEST,
  ACTION_REJECT_REQUEST,
  ACTION_UPDATE_REQUESTS_STATE,
  ACTION_UPDATE_REQUEST_PAGINATION_STATE,
  ACTION_RESET_REQUEST_SUCCESS_STATE,
  ACTION_RESET_REQUESTS_REDUCER_STATE,
  ACTION_GET_REQUESTS_STATUS_WIDGET_DATA,
  ACTION_GET_REQUESTS_COUNTS_WIDGET_DATA,
} from "./Constants";

export function newRequest(url, requestBody, headers = {}) {
  return {
    type: ACTION_NEW_REQUEST,
    payload: {
      kind: "post",
      url: url,
      requestBody: requestBody,
      headers: headers,
    },
  };
}

export function getRequests(
  url,
  headers = {},
  limit = 10,
  offset = 0,
  hasMore = false
) {
  return {
    type: ACTION_GET_REQUESTS,
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

export function updateRequestsState(requestsState = []) {
  return {
    type: ACTION_UPDATE_REQUESTS_STATE,
    payload: {
      requestsState: requestsState,
    },
  };
}

export function rejectRequest(url, requestBody, listIndex, headers = {}) {
  return {
    type: ACTION_REJECT_REQUEST,
    payload: {
      kind: "put",
      url: url,
      requestBody: requestBody,
      listIndex: listIndex,
      headers: headers,
    },
  };
}

export function acceptRequest(url, requestBody, listIndex, headers = {}) {
  return {
    type: ACTION_ACCEPT_REQUEST,
    payload: {
      kind: "put",
      url: url,
      requestBody: requestBody,
      listIndex: listIndex,
      headers: headers,
    },
  };
}

export function updateRequestPaginationState(
  offset = 0,
  limit = 10,
  hasMore = false
) {
  return {
    type: ACTION_UPDATE_REQUEST_PAGINATION_STATE,
    payload: {
      offset: offset,
      limit: limit,
      hasMore: hasMore,
    },
  };
}

export function deleteRequestLocal(requestID) {
  return {
    type: ACTION_DELETE_REQUEST_LOCAL,
    payload: {
      requestID: requestID,
    },
  };
}

export function resetRequestsSuccessState(attributeName = "") {
  return {
    type: ACTION_RESET_REQUEST_SUCCESS_STATE,
    payload: {
      attributeName: attributeName,
    },
  };
}

export function resetRequestsReducerState() {
  return {
    type: ACTION_RESET_REQUESTS_REDUCER_STATE,
  };
}

export function getRequestsStatusWidgetData(url, headers) {
  return {
    type: ACTION_GET_REQUESTS_STATUS_WIDGET_DATA,
    payload: {
      kind: "get",
      url: url,
      headers: headers,
    },
  };
}

export function getRequestsCountsWidgetData(url, headers) {
  return {
    type: ACTION_GET_REQUESTS_COUNTS_WIDGET_DATA,
    payload: {
      kind: "get",
      url: url,
      headers: headers,
    },
  };
}
