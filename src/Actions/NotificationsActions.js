import {
  ACTION_GET_NOTIFICATIONS,
  ACTION_GET_NOTIFICATIONS_BACKGROUND,
  ACTION_UPDATE_NOTIFICATIONS_PAGINATION_STATE,
  UPDATE_STOP_NOTIFICATIONS_CALLBACK_STATE,
} from "./Constants";

export function getNotifications(
  url,
  headers = {},
  limit = 10,
  offset = 0,
  hasMore = false
) {
  return {
    type: ACTION_GET_NOTIFICATIONS,
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

export function updatePauseNotificationsInfiniteScrollState(
  pauseNotificationsInfiniteScrollCallback = false
) {
  return {
    type: UPDATE_STOP_NOTIFICATIONS_CALLBACK_STATE,
    payload: {
      pauseNotificationsInfiniteScrollCallback:
        pauseNotificationsInfiniteScrollCallback,
    },
  };
}

export function updateNotificationsPaginationState(
  offset = 0,
  limit = 10,
  hasMore = false
) {
  return {
    type: ACTION_UPDATE_NOTIFICATIONS_PAGINATION_STATE,
    payload: {
      offset: offset,
      limit: limit,
      hasMore: hasMore,
    },
  };
}

export function fetchRecentNotificationsAfterInterval(
  url,
  headers = {},
  offset = 0,
  limit = 10
) {
  return {
    type: ACTION_GET_NOTIFICATIONS_BACKGROUND,
    payload: {
      kind: "get",
      url: url,
      headers: headers,
      offset: offset,
      limit: limit,
    },
  };
}
