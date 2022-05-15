import {
  ACTION_ADD_ORGANIZATION_FAILED,
  ACTION_ADD_ORGANIZATION_SUCCESS,
  ACTION_UPDATE_ADD_ORGANIZATION_UI_STATE,
  ACTION_GET_ORGANIZATION,
  ACTION_GET_ORGANIZATION_SUCCESS,
  ACTION_ADD_USER_SUCCESS,
  ACTION_UPDATE_ADD_USER_UI_STATE,
  ACTION_GET_USERS_SUCCESS,
  ACTION_UPDATE_GET_USERS_UI_STATE,
  ACTION_UPDATE_USERS_PAGINATION_STATE,
  UPDATE_STOP_CALLBACK_HELL_STATE,
  ACTION_UPDATE_PAUSE_USERS_INFINITE_CALLBACK_STATE,
  ACTION_ADD_USER_FAILED,
  ACTION_RESET_ADD_USER_SUCCESS_STATE,
  ACTION_UPDATE_ORGANIZATION_INFO_SUCCESS,
  ACTION_UPDATE_ORGANIZATION_INFO_FAILED,
  ACTION_RESET_USERS_REDUCER_STATE,
  ACTION_RESET_UPDATE_ORGANIZATION_STATE,
  ACTION_UPDATE_ORGANIZATION_INFO_UI_STATE,
  ACTION_UPDATE_GET_ORGANIZATION_UI_STATE,
  ACTION_GET_ORGANIZATION_FAILED,
} from "../Actions/Constants";

const initialOrganizationState = {
  pauseUsersInfiniteScrollCallback: false,
  addorganizationState: {},
  getOrganizationState: {},
  addUserState: {},
  getUsersState: [],
  getUsersQueryStringParameters: {
    limit: 10,
    offset: 0,
    hasMore: true,
  },
  loadingStatus: {
    addOrganizationLoading: false,
    getOrganizationLoading: false,
    addUserLoading: false,
    getUsersLoading: false,
    updateOrganizationInfoLoading: false,
  },
  errorObject: {
    addOrganization: {},
    getOrganization: {},
    addUser: {},
    getUsers: {},
    updateOrganizationInfo: {},
  },
  successObject: {
    addOrganization: {},
    getOrganization: {},
    addUser: {},
    getUsers: {},
    updateOrganizationInfo: {},
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

export const organizationsReducer = (
  state = initialOrganizationState,
  action
) => {
  switch (action.type) {
    case ACTION_ADD_ORGANIZATION_FAILED:
      return newStateObject(state, action);
    case ACTION_ADD_ORGANIZATION_SUCCESS:
      return newStateObject(state, action);
    case ACTION_UPDATE_ADD_ORGANIZATION_UI_STATE:
      return newStateObject(state, action);

    case ACTION_UPDATE_GET_ORGANIZATION_UI_STATE:
      return newStateObject(state, action);
    case ACTION_GET_ORGANIZATION_SUCCESS:
      return newStateObject(state, action);
    case ACTION_GET_ORGANIZATION_FAILED:
      return newStateObject(state, action);
    case ACTION_ADD_USER_SUCCESS:
      return newStateObject(state, action);
    case ACTION_RESET_ADD_USER_SUCCESS_STATE:
      return newStateObject(state, action);
    case ACTION_UPDATE_ADD_USER_UI_STATE:
      return newStateObject(state, action);
    case ACTION_ADD_USER_FAILED:
      return newStateObject(state, action);

    case ACTION_UPDATE_PAUSE_USERS_INFINITE_CALLBACK_STATE:
      return newStateObject(state, action);

    case ACTION_GET_USERS_SUCCESS:
      return {
        ...newStateObject(state, action),
        getUsersState: [
          ...state.getUsersState,
          ...action.payload.getUsersState,
        ],
      };
    case ACTION_UPDATE_GET_USERS_UI_STATE:
      return newStateObject(state, action);
    case ACTION_UPDATE_USERS_PAGINATION_STATE:
      return {
        ...state,
        getUsersQueryStringParameters: { ...action.payload },
      };
    case ACTION_UPDATE_ORGANIZATION_INFO_SUCCESS:
      return newStateObject(state, action);
    case ACTION_UPDATE_ORGANIZATION_INFO_FAILED:
      return newStateObject(state, action);
    case ACTION_RESET_USERS_REDUCER_STATE:
      return newStateObject(state, action);
    case ACTION_RESET_UPDATE_ORGANIZATION_STATE:
      return newStateObject(state, action);

    case ACTION_UPDATE_ORGANIZATION_INFO_UI_STATE:
      return newStateObject(state, action);

    default:
      return {
        ...state,
      };
  }
};
