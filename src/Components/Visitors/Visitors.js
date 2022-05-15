import { Button, Avatar, Divider, Skeleton } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Redirect } from "react-router";
import { useState, useEffect, useRef, Profiler } from "react";

import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Tabs } from "antd";

import "../Common/CSS/Common.css";
import "antd/dist/antd.css";
import "./Visitors.css";

import {
  acceptRequest,
  getRequests,
  rejectRequest,
  resetRequestsReducerState,
  updateRequestPaginationState,
  updateRequestsState,
} from "../../Actions/RequestActions";

import { updatePauseInfiniteScrollState } from "../../Actions/OrganizationsActions";
import InfiniteScrollContainer from "../InfiniteScrollContainer/InfiniteScrollContainer";

const { TabPane } = Tabs;
const getUserAttribute = (attributeName, userAttributes) => {
  let id;
  for (var index in userAttributes) {
    if (userAttributes[index]["Name"] === attributeName)
      id = userAttributes[index]["Value"];
    continue;
  }
  return id;
};

const Visitors = () => {
  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;
  // Similar to componentDidMount and componentDidUpdate:
  const [tabSelected, updateTabSelected] = useState("0");
  const {
    requestsState,
    profileState,
    loadingStatus,
    errorObject,
    successObject,
    getRequestsQueryStringParameters,
    pauseInfiniteScrollCallback,
  } = useSelector(
    (state) => ({
      requestsState: state.requests.requestsState,
      loadingStatus: state.requests.loadingStatus,
      errorObject: state.requests.errorObject,
      successObject: state.requests.successObject,
      profileState: state.signIn.profileState,
      getRequestsQueryStringParameters:
        state.requests.getRequestsQueryStringParameters,
      pauseInfiniteScrollCallback: state.requests.pauseInfiniteScrollCallback,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
  useEffect(() => {
    // Do something here on mount
    getRequestsHandler(true);

    return () => {
      dispatch(resetRequestsReducerState());
    };
  }, []);

  let { limit, offset, hasMore } = getRequestsQueryStringParameters;
  // if (Object.keys(errorObject).length) {
  //   hasMore = false;
  // }

  const getRequestsComponent = () => {
    let requests = requestsState;
    if (requests) {
      const requestRows = requests.map((value, index) => {
        let requestRow = [];
        if (tabSelected == value.status) {
          requestRow = (
            <>
              <div className="visitors-data-row-container-div">
                <Divider />
                <div id="visitors-data-row-div">
                  <div className="visitors-avatar-with-name-container-div visitors-data-column-div visitors-name-column-div">
                    <Avatar icon={<UserOutlined />}></Avatar>
                    <div className="visitors-avatar-username-text">
                      {`Shahbakht Anwar`}
                    </div>
                  </div>
                  <div className="visitors-data-column-div visitors-invite-details-column-div">
                    <div id="visitors-invitee-details-container">
                      <div id="visitors-invite-to-text">
                        {value.invitationTo}
                      </div>
                      <div id="visitors-invitees-num-text">{value.persons}</div>
                      <div className="visitors-date-time-text">
                        {value.invitationDate} - {value.invitationTime}
                      </div>
                      <div id="visitors-invitees-visit-purpose-text">
                        {value.reason}
                      </div>
                    </div>
                  </div>
                  <div className="visitors-data-column-div visitors-action-buttons-column-div">
                    <div className="visitors-action-button-container">
                      <Button
                        className="visitors-accept-button"
                        shape={"round"}
                        id={value._id}
                        listIndex={index}
                        loading={loadingStatus.acceptRequestLoading}
                        onClick={acceptRequestHandler}
                      >
                        Accept
                      </Button>
                      <Button
                        className="visitors-reject-button"
                        shape={"round"}
                        id={value._id}
                        listIndex={index}
                        loading={loadingStatus.rejectRequestLoading}
                        onClick={rejectRequestHandler}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
                <Divider />
              </div>
            </>
          );
        }
        return requestRow;
      });

      let appendSkeleton = (
        <>
          {requestRows}
          {loadingStatus.getRequestsLoading ? (
            <>
              <Skeleton avatar paragraph={{ rows: 2 }} />
            </>
          ) : (
            []
          )}
        </>
      );
      return appendSkeleton;
    } else {
      return [];
    }
  };

  const getRequestsHandler = (hasMore = hasMore) => {
    try {
      let userAttributes = profileState["profile"]["UserAttributes"];
      let id = getUserAttribute("custom:id", userAttributes);
      let refreshToken = profileState["refresh_token"];
      let accessToken = profileState["access_token"];
      let headers = {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      let status = tabSelected;
      let url = `http://localhost:3050/requests?limit=${getRequestsQueryStringParameters.limit}&offset=${getRequestsQueryStringParameters.offset}&status=${status}`;
      dispatch(updatePauseInfiniteScrollState(true));
      dispatch(getRequests(url, headers, limit, offset, hasMore));
    } catch (err) {}
  };
  const tabChangeCallback = (key) => {
    console.log("changing Tab");
    dispatch(updateRequestsState([]));
    updateTabSelected(key);
    dispatch(updateRequestPaginationState((offset = 0), (limit = 10), true));
    dispatch(updatePauseInfiniteScrollState(false));
  };

  const acceptRequestHandler = (e) => {
    let requestID = e.currentTarget.id;
    let refreshToken = profileState["refresh_token"];
    let accessToken = profileState["access_token"];
    let headers = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    let url = `http://localhost:3050/requests/updateStatus?id=${requestID}&status=${1}`;

    let listIndex = e.currentTarget.getAttribute("listIndex");

    dispatch(acceptRequest(url, {}, listIndex, headers));
  };

  const rejectRequestHandler = (e) => {
    let requestID = e.currentTarget.id;
    let refreshToken = profileState["refresh_token"];
    let accessToken = profileState["access_token"];
    let headers = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    let url = `http://localhost:3050/requests/updateStatus?id=${requestID}&status=${2}`;

    let listIndex = e.currentTarget.getAttribute("listIndex");
    dispatch(rejectRequest(url, {}, listIndex, headers));
  };

  let content = () => (
    <Profiler
      id="Content"
      onRender={(id, phase, actualDuration) => {
        console.log({ id, phase, actualDuration });
      }}
    >
      <div id="visitors-section-div">
        <div id="visitors-title-div">{`Requests Render Counter ${JSON.stringify(
          renderCount
        )}`}</div>
        <Tabs
          defaultActiveKey="0"
          type="card"
          onChange={tabChangeCallback}
          className="request-status-tabs"
        >
          <TabPane tab="Pending" key={0}></TabPane>
          <TabPane tab="Accepted" key={1}></TabPane>
          <TabPane tab="Rejected" key={2}></TabPane>
        </Tabs>

        {getRequestsComponent(requestsState)}
      </div>
    </Profiler>
  );

  if (!Object.keys(profileState).length) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <InfiniteScrollContainer
      menu="Requests"
      content={content}
      isAdmin={true}
      loadFunc={getRequestsHandler}
      hasMore={hasMore}
      pauseInfiniteScrollCallback={pauseInfiniteScrollCallback}
    ></InfiniteScrollContainer>
  );
};

export default Visitors;
