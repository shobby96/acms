import { put, call } from "redux-saga/effects";
import { updateSessionStatus } from "../Actions/AuthenticationActions";
import {
  ACTION_ACCEPT_REQUEST_FAILED,
  ACTION_ACCEPT_REQUEST_SUCCESS,
  ACTION_GET_REQUESTS_COUNTS_WIDGET_DATA_FAILED,
  ACTION_GET_REQUESTS_COUNTS_WIDGET_DATA_SUCCESS,
  ACTION_GET_REQUESTS_FAILED,
  ACTION_GET_REQUESTS_STATUS_WIDGET_DATA_FAILED,
  ACTION_GET_REQUESTS_STATUS_WIDGET_DATA_SUCCESS,
  ACTION_GET_REQUESTS_SUCCESS,
  ACTION_NEW_REQUEST,
  ACTION_NEW_REQUEST_FAILED,
  ACTION_NEW_REQUEST_SUCCESS,
  ACTION_REJECT_REQUEST_FAILED,
  ACTION_REJECT_REQUEST_SUCCESS,
  ACTION_UPDATE_ACCEPT_REQUEST_UI_STATE,
  ACTION_UPDATE_GET_REQUESTS_COUNTS_WIDGET_DATA_UI_STATE,
  ACTION_UPDATE_GET_REQUESTS_STATUS_WIDGET_DATA_UI_STATE,
  ACTION_UPDATE_GET_REQUESTS_UI_STATE,
  ACTION_UPDATE_NEW_REQUEST_UI_STATE,
  ACTION_UPDATE_REJECT_REQUEST_UI_STATE,
} from "../Actions/Constants";
import { updatePauseInfiniteScrollState } from "../Actions/OrganizationsActions";
import {
  deleteRequestLocal,
  getRequests,
  updateRequestPaginationState,
} from "../Actions/RequestActions";
import api from "../Services/api";

export function* newRequestAsync({ payload }) {
  yield put({
    type: ACTION_UPDATE_NEW_REQUEST_UI_STATE,
    payload: {
      loadingStatus: {
        newRequestLoading: true,
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
      type: ACTION_NEW_REQUEST_SUCCESS,
      payload: {
        loadingStatus: {
          newRequestLoading: false,
        },
        successObject: {
          newRequest: { message: "Signed in successfully" },
        },
        errorObject: {
          newRequest: {},
        },
      },
    });
  } catch (error) {
    // Updates Validity of auth token
    let errorObject;
    if (error.response)
      errorObject = error.response.data.error
        ? { newRequest: { message: error.response.data.error } }
        : { newRequest: { message: "Login failed" } };
    else errorObject = { newRequest: { message: error.message } };
    if (error.response && error.response.data === "Unauthorized") {
      yield put(updateSessionStatus(false));
    }
    yield put({
      type: ACTION_NEW_REQUEST_FAILED,
      payload: {
        errorObject: errorObject,
        loadingStatus: {
          newRequestLoading: false,
        },
      },
    });
  }
}

export function* getRequestsAsync({ payload }) {
  yield put({
    type: ACTION_UPDATE_GET_REQUESTS_UI_STATE,
    payload: {
      loadingStatus: {
        getRequestsLoading: true,
      },
    },
  });

  let response = {};
  let hasMore = true;

  try {
    if (payload.hasMore) {
      response = yield call(api.get, payload.url, payload.headers);
    }
    console.log(
      "response: ",
      response,
      "url: ",
      payload.url,
      "headers: ",
      payload.headers
    );
    if (!response || !response.data || !response.data.requests.length) {
      console.log("HERE 11111111");
      response.data = {};
      response.data.requests = [];
      console.log("here 22222222");
      hasMore = false;
      yield put(
        updateRequestPaginationState(payload.offset, payload.limit, hasMore)
      );
    }

    yield put({
      type: ACTION_GET_REQUESTS_SUCCESS,
      payload: {
        requestsState: response.data.requests,
        loadingStatus: {
          getRequestsLoading: false,
        },
        successObject: {
          requests: { message: "Signed in successfully" },
        },

        errorObject: {
          requests: {},
        },
      },
    });
    yield put(
      updateRequestPaginationState(
        payload.offset + response.data.requests.length,
        payload.limit,
        hasMore
      )
    );
    yield put(updatePauseInfiniteScrollState(false));
  } catch (error) {
    // Updates Validity of auth token
    let errorObject;
    if (error.response)
      errorObject = error.response.data.error
        ? { requests: { message: error.response.data.error } }
        : { requests: { message: "Login failed" } };
    else errorObject = { requests: { message: error.message } };

    yield put(
      updateRequestPaginationState(payload.limit, payload.offset, false)
    );
    if (error.response && error.response.data === "Unauthorized") {
      yield put(updateSessionStatus(false));
    }
    yield put({
      type: ACTION_GET_REQUESTS_FAILED,
      payload: {
        errorObject: errorObject,
        loadingStatus: {
          getRequestsLoading: false,
        },
      },
    });
  }
}

export function* acceptRequestAsync({ payload }) {
  yield put({
    type: ACTION_UPDATE_ACCEPT_REQUEST_UI_STATE,
    payload: {
      loadingStatus: {
        acceptRequestLoading: true,
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
      type: ACTION_ACCEPT_REQUEST_SUCCESS,
      payload: {
        acceptRequestState: response.data,
        loadingStatus: {
          acceptRequestLoading: false,
        },
        successObject: {
          acceptRequest: { message: "Request updated successfully" },
        },

        errorObject: {
          acceptRequest: {},
        },
      },
    });

    yield put(deleteRequestLocal(payload.listIndex));
  } catch (error) {
    // Updates Validity of auth token
    let errorObject;
    if (error.response)
      errorObject = error.response.data.error
        ? { acceptRequest: { message: error.response.data.error } }
        : { acceptRequest: { message: "Login failed" } };
    else errorObject = { acceptRequest: { message: error.message } };
    if (error.response && error.response.data === "Unauthorized") {
      yield put(updateSessionStatus(false));
    }
    yield put({
      type: ACTION_ACCEPT_REQUEST_FAILED,
      payload: {
        errorObject: errorObject,
        loadingStatus: {
          acceptRequestLoading: false,
        },
      },
    });
  }
}

export function* rejectRequestAsync({ payload }) {
  yield put({
    type: ACTION_UPDATE_REJECT_REQUEST_UI_STATE,
    payload: {
      loadingStatus: {
        rejectRequestLoading: true,
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
      type: ACTION_REJECT_REQUEST_SUCCESS,
      payload: {
        rejectRequestState: response.data,
        loadingStatus: {
          rejectRequestLoading: false,
        },
        successObject: {
          rejectRequest: { message: "Signed in successfully" },
        },

        errorObject: {
          rejectRequest: {},
        },
      },
    });
    yield put(deleteRequestLocal(payload.listIndex));
  } catch (error) {
    // Updates Validity of auth token
    let errorObject;
    if (error.response)
      errorObject = error.response.data.error
        ? { rejectRequest: { message: error.response.data.error } }
        : { rejectRequest: { message: "Login failed" } };
    else errorObject = { rejectRequest: { message: error.message } };
    if (error.response && error.response.data === "Unauthorized") {
      yield put(updateSessionStatus(false));
    }
    yield put({
      type: ACTION_REJECT_REQUEST_FAILED,
      payload: {
        errorObject: errorObject,
        loadingStatus: {
          rejectRequestLoading: false,
        },
      },
    });
  }
}

export function* getRequestsStateWidgetDataAsync({ payload }) {
  try {
    yield put({
      type: ACTION_UPDATE_GET_REQUESTS_STATUS_WIDGET_DATA_UI_STATE,
      payload: {
        loadingStatus: { requestsStatusWidgetDataLoading: true },
      },
    });

    let response = yield call(api.get, payload.url, payload.headers);

    yield put({
      type: ACTION_GET_REQUESTS_STATUS_WIDGET_DATA_SUCCESS,
      payload: {
        requestsStatusWidgetData: response.data.stats,
        loadingStatus: {
          requestsStatusWidgetDataLoading: false,
        },
        successObject: {
          requestsStatusWidgetData: {
            message: "Widget data fetched successfully",
          },
        },

        errorObject: {
          requestsStatusWidgetData: {},
        },
      },
    });
  } catch (error) {
    // Updates Validity of auth token
    let errorObject;
    if (error.response)
      errorObject = error.response.data.error
        ? { requestsStatusWidgetData: { message: error.response.data.error } }
        : {
            requestsStatusWidgetData: {
              message: "An error occurred while fetching the widget data!",
            },
          };
    else errorObject = { requestsStatusWidgetData: { message: error.message } };
    if (error.response && error.response.data === "Unauthorized") {
      yield put(updateSessionStatus(false));
    }
    yield put({
      type: ACTION_GET_REQUESTS_STATUS_WIDGET_DATA_FAILED,
      payload: {
        errorObject: errorObject,
        loadingStatus: {
          requestsStatusWidgetDataLoading: false,
        },
      },
    });
  }
}

export function* getRequestsCountsWidgetDataAsync({ payload }) {
  try {
    yield put({
      type: ACTION_UPDATE_GET_REQUESTS_COUNTS_WIDGET_DATA_UI_STATE,
      payload: {
        loadingStatus: { requestsCountsWidgetDataLoading: true },
      },
    });

    let response = yield call(api.get, payload.url, payload.headers);

    yield put({
      type: ACTION_GET_REQUESTS_COUNTS_WIDGET_DATA_SUCCESS,
      payload: {
        requestsCountsWidgetData: response.data.requestsCountsStats,
        loadingStatus: {
          requestsCountsWidgetDataLoading: false,
        },
        successObject: {
          requestsCountsWidgetData: {
            message: "Widget data fetched successfully",
          },
        },

        errorObject: {
          requestsCountsWidgetData: {},
        },
      },
    });
  } catch (error) {
    // Updates Validity of auth token
    let errorObject;
    if (error.response)
      errorObject = error.response.data.error
        ? { requestsCountsWidgetData: { message: error.response.data.error } }
        : {
            requestsCountsWidgetData: {
              message: "An error occurred while fetching the widget data!",
            },
          };
    else errorObject = { requestsCountsWidgetData: { message: error.message } };
    if (error.response && error.response.data === "Unauthorized") {
      yield put(updateSessionStatus(false));
    }
    yield put({
      type: ACTION_GET_REQUESTS_COUNTS_WIDGET_DATA_FAILED,
      payload: {
        errorObject: errorObject,
        loadingStatus: {
          requestsCountsWidgetDataLoading: false,
        },
      },
    });
  }
}
