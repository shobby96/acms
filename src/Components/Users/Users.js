import React from "react";
import { Avatar, Button, Skeleton } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import InfiniteScrollContainer from "../InfiniteScrollContainer/InfiniteScrollContainer";
import {
  getUsers,
  resetUsersReducerState,
  updatePauseUsersInfiniteScrollState,
} from "../../Actions/OrganizationsActions";

import "./Users.css";

const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getUsersHandler();
    return () => {
      dispatch(resetUsersReducerState());
    };
  }, []);

  const {
    profileState,
    getUsersState,
    loadingStatus,
    getUsersQueryStringParameters,
    pauseUsersInfiniteScrollCallback,
  } = useSelector(
    (state) => ({
      profileState: state.signIn.profileState,
      getUsersState: state.organizations.getUsersState,
      loadingStatus: state.organizations.loadingStatus,
      successObject: state.organizations.successObject,
      errorObject: state.organizations.errorObject,
      getUsersQueryStringParameters:
        state.organizations.getUsersQueryStringParameters,
      pauseUsersInfiniteScrollCallback:
        state.organizations.pauseUsersInfiniteScrollCallback,
    }),

    shallowEqual
  );

  let { limit, offset, hasMore } = getUsersQueryStringParameters;

  const getUsersHandler = () => {
    if (loadingStatus.getUsersLoading) return;
    let refreshToken = profileState["refresh_token"];
    let accessToken = profileState["access_token"];
    let headers = {
      refreshToken: refreshToken,
      accessToken: accessToken,
    };
    let url = `http://localhost:3050/users?limit=${limit}&offset=${offset}`;
    dispatch(updatePauseUsersInfiniteScrollState(true));
    dispatch(getUsers(url, headers, limit, offset, hasMore));
  };

  const userInfoCards = () => {
    let userCards = [];

    getUsersState.map((value, index) => {
      const { userId, isAdmin, firstName, lastName, email, profileImage } =
        value;
      let userCard = (
        <React.Fragment>
          <div className="user-info-card">
            <Avatar className="user-avatar"></Avatar>
            <div className="user-info">
              <div>{`${firstName} ${lastName}`}</div>
              <div>{`${email}`}</div>
            </div>
            <div className="user-actions">
              <Button
                icon={<EditOutlined />}
                className="edit-button"
                shape="circle"
              ></Button>
              <Button
                icon={<DeleteOutlined />}
                className="delete-button"
                shape="circle"
              ></Button>
            </div>
          </div>
        </React.Fragment>
      );
      userCards.push(userCard);
    });

    let skeletonWrappedCards = (
      <>
        {userCards}
        {loadingStatus.getUsersLoading ? (
          <>
            <Skeleton avatar paragraph={{ rows: 2 }} />
            <Skeleton avatar paragraph={{ rows: 2 }} />
          </>
        ) : (
          []
        )}
      </>
    );
    return skeletonWrappedCards;
  };

  const content = () => (
    <div className="user-content-container">{userInfoCards()}</div>
  );
  return (
    <InfiniteScrollContainer
      menu="Users"
      content={content}
      isAdmin={true}
      hasMore={hasMore}
      loadFunc={getUsersHandler}
      pauseInfiniteScrollCallback={pauseUsersInfiniteScrollCallback}
    ></InfiniteScrollContainer>
  );
};

export default Users;
