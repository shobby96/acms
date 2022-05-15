import { useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Menu, Dropdown } from "antd";
import { BellOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroller";

import {
  fetchRecentNotificationsAfterInterval,
  getNotifications,
  updatePauseNotificationsInfiniteScrollState,
} from "../../Actions/NotificationsActions";

import "./Notifications.css";

const Notifications = () => {
  const {
    notificationsState,
    profileState,
    loadingStatus,
    errorObject,
    successObject,
    getNotificationsQueryStringParameters,
    pauseNotificationsInfiniteScrollCallback,
  } = useSelector(
    (state) => ({
      notificationsState: state.notifications.notificationsState,
      loadingStatus: state.notifications.loadingStatus,
      errorObject: state.notifications.errorObject,
      successObject: state.notifications.successObject,
      profileState: state.signIn.profileState,
      getNotificationsQueryStringParameters:
        state.notifications.getNotificationsQueryStringParameters,
      pauseNotificationsInfiniteScrollCallback:
        state.notifications.pauseNotificationsInfiniteScrollCallback,
    }),
    shallowEqual
  );

  let dispatch = useDispatch();

  const getRecentNotificationsHandler = () => {
    let { limit, offset, hasMore } = getNotificationsQueryStringParameters;
    if (loadingStatus.getNotificationsLoading) return;

    let refreshToken = profileState["refresh_token"];
    let accessToken = profileState["access_token"];
    let headers = {
      refreshToken: refreshToken,
      accessToken: accessToken,
    };
    let url = `http://localhost:3050/requests/getNotifications?limit=${5}&offset=${0}`;

    dispatch(fetchRecentNotificationsAfterInterval(url, headers));
  };
  useEffect(() => {
    // Call Notifications API here
    getRecentNotificationsHandler();
    return () => {
      // console.log("unmounting Notifications");
    };
  }, []);

  const getMenu = () => {
    let { hasMore } = getNotificationsQueryStringParameters;
    let menuItems = Object.keys(notificationsState).map((notification) => {
      return (
        <Menu.Item className="notifications-menu-item">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            {notificationsState[notification]}
          </a>
        </Menu.Item>
      );
    });
    return (
      <div className="notifications-infinite-scroll-wrapper">
        <InfiniteScroll
          pageStart={0}
          className="notifications-infinite-scroll"
          loadMore={getNotificationsHandler}
          hasMore={hasMore && !pauseNotificationsInfiniteScrollCallback}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
          useWindow={false}
        >
          <Menu className="notifications-menu">{menuItems}</Menu>
        </InfiniteScroll>
      </div>
    );
  };

  const getNotificationsHandler = () => {
    let { limit, offset, hasMore } = getNotificationsQueryStringParameters;
    if (loadingStatus.getNotificationsLoading) return;

    let refreshToken = profileState["refresh_token"];
    let accessToken = profileState["access_token"];
    let headers = {
      refreshToken: refreshToken,
      accessToken: accessToken,
    };
    let url = `http://localhost:3050/requests/getNotifications?limit=${limit}&offset=${offset}`;
    dispatch(updatePauseNotificationsInfiniteScrollState(true));
    dispatch(getNotifications(url, headers, limit, offset, hasMore));
  };
  return (
    <Dropdown overlay={getMenu} trigger={"click"}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        <BellOutlined className="notifications-bell-icon" />
      </a>
    </Dropdown>
  );
};

export default Notifications;
