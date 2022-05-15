import {
  ACTION_GET_NOTIFICATIONS_FAILED,
  ACTION_GET_NOTIFICATIONS_SUCCESS,
  ACTION_GET_ORGANIZATION_SUCCESS,
  ACTION_UPDATE_GET_NOTIFICATIONS_UI_STATE,
  ACTION_UPDATE_NOTIFICATIONS_PAGINATION_STATE,
  UPDATE_STOP_NOTIFICATIONS_CALLBACK_STATE,
} from "../Actions/Constants";

const initialNotificationsState = {
  pauseNotificationsInfiniteScrollCallback: false,
  notificationsState: {},
  getNotificationsQueryStringParameters: {
    limit: 10,
    offset: 0,
    hasMore: true,
  },
  loadingStatus: {
    getNotificationsLoading: false,
  },
  errorObject: {
    getNotifications: {},
  },
  successObject: {
    getNotifications: {},
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

export const notificationsReducer = (
  state = initialNotificationsState,
  action
) => {
  switch (action.type) {
    case ACTION_GET_NOTIFICATIONS_FAILED:
      return newStateObject(state, action);
    case ACTION_GET_NOTIFICATIONS_SUCCESS:
      let indexedNotifications = {};
      action.payload.notificationsState.forEach((notification) => {
        indexedNotifications[notification.id] = [notification.message];
      });
      return {
        ...newStateObject(state, action),
        notificationsState: {
          ...state.notificationsState,
          ...indexedNotifications,
        },
      };
    case ACTION_UPDATE_GET_NOTIFICATIONS_UI_STATE:
      return newStateObject(state, action);
    case UPDATE_STOP_NOTIFICATIONS_CALLBACK_STATE:
      return newStateObject(state, action);
    case ACTION_UPDATE_NOTIFICATIONS_PAGINATION_STATE:
      return {
        ...state,
        getNotificationsQueryStringParameters: { ...action.payload },
      };

    default:
      return {
        ...state,
      };
  }
};
