import {
  ACTION_NEW_REQUEST_FAILED,
  ACTION_NEW_REQUEST_SUCCESS,
  ACTION_UPDATE_NEW_REQUEST_UI_STATE,
  ACTION_GET_REQUESTS_FAILED,
  ACTION_GET_REQUESTS_SUCCESS,
  ACTION_UPDATE_GET_REQUESTS_UI_STATE,
  ACTION_ACCEPT_REQUEST_FAILED,
  ACTION_ACCEPT_REQUEST_SUCCESS,
  ACTION_UPDATE_ACCEPT_REQUEST_UI_STATE,
  ACTION_REJECT_REQUEST_FAILED,
  ACTION_REJECT_REQUEST_SUCCESS,
  ACTION_UPDATE_REJECT_REQUEST_UI_STATE,
  ACTION_UPDATE_REQUEST_PAGINATION_STATE,
  ACTION_UPDATE_REQUESTS_STATE,
  ACTION_DELETE_REQUEST_LOCAL,
  ACTION_RESET_REQUEST_SUCCESS_STATE,
  ACTION_RESET_REQUESTS_REDUCER_STATE,
  ACTION_GET_REQUESTS_STATUS_WIDGET_DATA,
  ACTION_GET_REQUESTS_STATUS_WIDGET_DATA_SUCCESS,
  ACTION_GET_REQUESTS_STATUS_WIDGET_DATA_FAILED,
  ACTION_UPDATE_GET_REQUESTS_STATUS_WIDGET_DATA_UI_STATE,
  ACTION_GET_REQUESTS_COUNTS_WIDGET_DATA_SUCCESS,
  ACTION_GET_REQUESTS_COUNTS_WIDGET_DATA_FAILED,
  ACTION_UPDATE_GET_REQUESTS_COUNTS_WIDGET_DATA_UI_STATE,
  UPDATE_STOP_CALLBACK_HELL_STATE,
} from "../Actions/Constants";

const initialRequestsState = {
  requestsState: [],
  pauseInfiniteScrollCallback: false,
  requestsStatusWidgetData: {},
  requestsCountsWidgetData: {},
  getRequestsQueryStringParameters: {
    limit: 10,
    offset: 0,
    hasMore: true,
  },
  acceptRequestState: {},
  rejectRequestState: {},
  loadingStatus: {
    newRequestLoading: false,
    getRequestsLoading: false,
    acceptRequestLoading: false,
    rejectRequestLoading: false,
    requestsStatusWidgetDataLoading: false,
    requestsCountsWidgetDataLoading: false,
  },
  errorObject: {
    newRequest: {},
    getRequests: {},
    acceptRequest: {},
    rejectRequest: {},
    requestsStatusWidgetData: {},
    requestsCountsStatusWidgetData: {},
  },
  successObject: {
    newRequest: {},
    getRequests: {},
    acceptRequest: {},
    rejectRequest: {},
    requestsStatusWidgetData: {},
    requestsCountsStatusWidgetData: {},
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

export const requestsReducer = (state = initialRequestsState, action) => {
  switch (action.type) {
    case ACTION_NEW_REQUEST_FAILED:
      return newStateObject(state, action);
    case ACTION_NEW_REQUEST_SUCCESS:
      return newStateObject(state, action);
    case ACTION_UPDATE_NEW_REQUEST_UI_STATE:
      return newStateObject(state, action);

    case ACTION_GET_REQUESTS_FAILED:
      return newStateObject(state, action);
    case ACTION_GET_REQUESTS_SUCCESS:
      return {
        ...newStateObject(state, action),
        requestsState: [
          ...state.requestsState,
          ...action.payload.requestsState,
        ],
      };

    case ACTION_UPDATE_REQUESTS_STATE:
      return {
        ...newStateObject(state, action),
        requestsState: action.payload.requestsState,
      };
    case ACTION_UPDATE_GET_REQUESTS_UI_STATE:
      return newStateObject(state, action);

    case ACTION_ACCEPT_REQUEST_FAILED:
      return newStateObject(state, action);
    case ACTION_ACCEPT_REQUEST_SUCCESS:
      return newStateObject(state, action);
    case ACTION_UPDATE_ACCEPT_REQUEST_UI_STATE:
      return newStateObject(state, action);

    case ACTION_REJECT_REQUEST_FAILED:
      return newStateObject(state, action);
    case ACTION_REJECT_REQUEST_SUCCESS:
      return newStateObject(state, action);
    case ACTION_UPDATE_REJECT_REQUEST_UI_STATE:
      return newStateObject(state, action);

    case ACTION_RESET_REQUEST_SUCCESS_STATE:
      let resetObject = {
        newRequest: {},
        getRequests: {},
        acceptRequest: {},
        rejectRequest: {},
      };
      if (action.payload.attributeName) {
        resetObject = {
          [action.payload.attributeName]: {},
        };
      }
      return {
        ...state,
        successObject: {
          ...state.successObject,
          ...resetObject,
        },
      };

    case ACTION_UPDATE_REQUEST_PAGINATION_STATE:
      return {
        ...state,
        getRequestsQueryStringParameters: { ...action.payload },
      };

    case ACTION_DELETE_REQUEST_LOCAL:
      let requestsStateCopy = [...state.requestsState];
      requestsStateCopy.splice(action.payload.requestID, 1);
      return {
        ...state,
        requestsState: requestsStateCopy,
      };

    case ACTION_RESET_REQUESTS_REDUCER_STATE:
      return {
        ...state,
        ...initialRequestsState,
      };

    case ACTION_GET_REQUESTS_STATUS_WIDGET_DATA_SUCCESS:
      return newStateObject(state, action);
    case ACTION_GET_REQUESTS_STATUS_WIDGET_DATA_FAILED:
      return newStateObject(state, action);
    case ACTION_UPDATE_GET_REQUESTS_STATUS_WIDGET_DATA_UI_STATE:
      return newStateObject(state, action);

    case ACTION_GET_REQUESTS_COUNTS_WIDGET_DATA_SUCCESS:
      return newStateObject(state, action);
    case ACTION_GET_REQUESTS_COUNTS_WIDGET_DATA_FAILED:
      return newStateObject(state, action);
    case ACTION_UPDATE_GET_REQUESTS_COUNTS_WIDGET_DATA_UI_STATE:
      return newStateObject(state, action);

    case UPDATE_STOP_CALLBACK_HELL_STATE:
      return newStateObject(state, action);
    default:
      return {
        ...state,
      };
  }
};
