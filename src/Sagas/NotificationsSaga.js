import { put, call, delay } from "redux-saga/effects";
import { updateSessionStatus } from "../Actions/AuthenticationActions";
import {
  ACTION_GET_NOTIFICATIONS_FAILED,
  ACTION_GET_NOTIFICATIONS_SUCCESS,
  ACTION_UPDATE_GET_NOTIFICATIONS_UI_STATE,
} from "../Actions/Constants";
import {
  fetchRecentNotificationsAfterInterval,
  updateNotificationsPaginationState,
  updatePauseNotificationsInfiniteScrollState,
} from "../Actions/NotificationsActions";
import api from "../Services/api";

export function* getNotificationsAsync({ payload }) {
  yield put({
    type: ACTION_UPDATE_GET_NOTIFICATIONS_UI_STATE,
    payload: {
      loadingStatus: {
        getNotificationsLoading: true,
      },
    },
  });

  let response = {};
  let hasMore = true;

  try {
    if (payload.hasMore) {
      response = yield call(api.get, payload.url, payload.headers);
    }
    if (!response || !response.data || !response.data.notifications.length) {
      response.data.notifications = [];
      hasMore = false;
      yield put(
        updateNotificationsPaginationState(
          payload.offset,
          payload.limit,
          hasMore
        )
      );
    }

    yield put({
      type: ACTION_GET_NOTIFICATIONS_SUCCESS,
      payload: {
        notificationsState: response.data.notifications,
        loadingStatus: {
          getNotificationsLoading: false,
        },
        successObject: {
          getNotifications: { message: "Notifications Fetched Successfully" },
        },

        errorObject: {
          getNotifications: {},
        },
      },
    });
    yield put(
      updateNotificationsPaginationState(
        payload.offset + response.data.notifications.length,
        payload.limit,
        hasMore
      )
    );
    yield put(updatePauseNotificationsInfiniteScrollState(false));
  } catch (error) {
    // Updates Validity of auth token
    let errorObject;
    if (error.response)
      errorObject = error.response.data.error
        ? { getNotifications: { message: error.response.data.error } }
        : { getNotifications: { message: "Login failed" } };
    else errorObject = { getNotifications: { message: error.message } };

    yield put(
      updateNotificationsPaginationState(payload.limit, payload.offset, false)
    );
    if (error.response && error.response.data === "Unauthorized") {
      yield put(updateSessionStatus(false));
    }
    yield put({
      type: ACTION_GET_NOTIFICATIONS_FAILED,
      payload: {
        errorObject: errorObject,
        loadingStatus: {
          getNotificationsLoading: false,
        },
      },
    });
  }
}

export function* getNotificationsBackgroundAsync({ payload }) {
  try {
    yield delay(30000);

    let response = yield call(api.get, payload.url, payload.headers);

    yield put({
      type: ACTION_GET_NOTIFICATIONS_SUCCESS,
      payload: {
        notificationsState: response.data.notifications,
      },
    });
    yield put(
      fetchRecentNotificationsAfterInterval(payload.url, payload.headers)
    );
  } catch (err) {
    yield put(
      fetchRecentNotificationsAfterInterval(payload.url, payload.headers)
    );
  }
}
