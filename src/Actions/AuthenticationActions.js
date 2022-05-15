import {
  ACTION_CONFIRM_SIGN_UP,
  ACTION_SIGN_IN,
  ACTION_SIGN_UP,
  ACTION_UPDATE_SESSION_STATUS,
  SIGNOUT,
} from "./Constants";

export function signIn(url, requestBody, headers = {}) {
  return {
    type: ACTION_SIGN_IN,
    payload: {
      kind: "post",
      url: url,
      requestBody: requestBody,
      headers: headers,
    },
  };
}

export function signUp(url, requestBody, headers = {}) {
  return {
    type: ACTION_SIGN_UP,
    payload: {
      kind: "post",
      url: url,
      requestBody: requestBody,
      headers: headers,
    },
  };
}

export function confrimSignUp(url, requestBody, headers = {}) {
  return {
    type: ACTION_CONFIRM_SIGN_UP,
    payload: {
      kind: "post",
      url: url,
      requestBody: requestBody,
      headers: headers,
    },
  };
}

export function signout() {
  return {
    type: SIGNOUT,
  };
}

export function updateSessionStatus(isValid = false) {
  return {
    type: ACTION_UPDATE_SESSION_STATUS,
    payload: {
      sessionValid: isValid,
    },
  };
}
