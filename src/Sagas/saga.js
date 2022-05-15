import { takeEvery, takeLatest, takeLeading } from "redux-saga/effects";
import {
  ACTION_ACCEPT_REQUEST,
  ACTION_ADD_ORGANIZATION,
  ACTION_ADD_USER,
  ACTION_CONFIRM_SIGN_UP,
  ACTION_GET_NOTIFICATIONS,
  ACTION_GET_NOTIFICATIONS_BACKGROUND,
  ACTION_GET_ORGANIZATION,
  ACTION_GET_PROFILE,
  ACTION_GET_REQUESTS,
  ACTION_GET_REQUESTS_COUNTS_WIDGET_DATA,
  ACTION_GET_REQUESTS_STATUS_WIDGET_DATA,
  ACTION_GET_USERS,
  ACTION_NEW_REQUEST,
  ACTION_REJECT_REQUEST,
  ACTION_SIGN_IN,
  ACTION_SIGN_UP,
  ACTION_UPDATE_ORGANIZATION_INFO,
  ACTION_UPDATE_USER_PROFILE,
} from "../Actions/Constants";
import { getRequestsCountsWidgetData } from "../Actions/RequestActions";
import {
  getNotificationsAsync,
  getNotificationsBackgroundAsync,
} from "./NotificationsSaga";
import {
  addOrganizationRequestAsync,
  addUserAsync,
  getOrganizationAsync,
  getUsersAsync,
  updateOrganizationInfoAsync,
} from "./OrganizationsSaga";
import { getProfileAsync, updateUserProfileAsync } from "./ProfileSaga";
import {
  acceptRequestAsync,
  getRequestsAsync,
  getRequestsCountsWidgetDataAsync,
  getRequestsStateWidgetDataAsync,
  newRequestAsync,
  rejectRequestAsync,
} from "./RequestsSaga";
import { signInRequestAsync } from "./SignInSaga";
import { confirmSignUpRequestAsync, signUpRequestAsync } from "./SignUpSaga";

export function* rootSaga() {
  yield takeLatest(ACTION_SIGN_IN, signInRequestAsync);
  yield takeLeading(ACTION_SIGN_UP, signUpRequestAsync);
  yield takeLeading(ACTION_CONFIRM_SIGN_UP, confirmSignUpRequestAsync);
  yield takeLeading(ACTION_ADD_ORGANIZATION, addOrganizationRequestAsync);
  yield takeLeading(ACTION_NEW_REQUEST, newRequestAsync);
  yield takeLeading(ACTION_GET_REQUESTS, getRequestsAsync);
  yield takeLeading(ACTION_ACCEPT_REQUEST, acceptRequestAsync);
  yield takeLeading(ACTION_REJECT_REQUEST, rejectRequestAsync);
  yield takeLeading(ACTION_GET_ORGANIZATION, getOrganizationAsync);
  yield takeLeading(ACTION_ADD_USER, addUserAsync);
  yield takeLeading(ACTION_GET_USERS, getUsersAsync);
  yield takeLeading(ACTION_GET_NOTIFICATIONS, getNotificationsAsync);
  yield takeLeading(ACTION_GET_PROFILE, getProfileAsync);
  yield takeLeading(
    ACTION_GET_NOTIFICATIONS_BACKGROUND,
    getNotificationsBackgroundAsync
  );
  yield takeLeading(
    ACTION_UPDATE_ORGANIZATION_INFO,
    updateOrganizationInfoAsync
  );
  yield takeLeading(ACTION_UPDATE_USER_PROFILE, updateUserProfileAsync);

  yield takeLeading(
    ACTION_GET_REQUESTS_STATUS_WIDGET_DATA,
    getRequestsStateWidgetDataAsync
  );
  yield takeLeading(
    ACTION_GET_REQUESTS_COUNTS_WIDGET_DATA,
    getRequestsCountsWidgetDataAsync
  );
}
