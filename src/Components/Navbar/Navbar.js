import React, { useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Drawer, Button, Avatar, Popover } from "antd";
import { MenuOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";
import { Redirect } from "react-router";

import Notifications from "../Notifications/Notifications";
import {
  signout,
  updateSessionStatus,
} from "../../Actions/AuthenticationActions";

import "./Navbar.css";

const NavBar = ({ menu }) => {
  const { profileState, sessionValid } = useSelector(
    (state) => ({
      profileState: state.signIn.profileState,
      sessionValid: state.signIn.sessionValid,
    }),
    shallowEqual
  );
  const [visible, setVisible] = useState(false);
  const [redirectRoute, updateRedirectRoute] = useState("");
  const dispatch = useDispatch();
  const signoutClickHandler = (e) => {
    switch (e.currentTarget.name) {
      case "signout":
        dispatch(updateSessionStatus());
        break;
      case "profile":
        updateRedirectRoute("/profile");
      default:
        break;
    }
  };

  if (!sessionValid) {
    dispatch(signout());
  }
  if (redirectRoute) {
    return <Redirect push to={redirectRoute}></Redirect>;
  }

  if (!Object.keys(profileState.profile).length) {
    return <Redirect to={"/"}></Redirect>;
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Button
          className="navbar-menu-button"
          type="primary"
          icon={<MenuOutlined className="navbar-menu-icon" />}
          onClick={() => setVisible(true)}
        />
        <Drawer
          closable={false}
          placement="left"
          onClick={() => setVisible(false)}
          onClose={() => setVisible(false)}
          visible={visible}
          className="navbar-drawer"
        >
          {menu()}
        </Drawer>
        <Button
          className="navbar-home-button"
          icon={<HomeOutlined className="navbar-home-icon" alt="logo" />}
          onClick={() => updateRedirectRoute("/")}
        ></Button>
      </div>
      <div className="navbar-right">
        <Popover
          className="navbar-avatar-popover"
          overlayClassName="navbar-avatar-popover-overlay"
          placement="bottomRight"
          title={"Settings"}
          content={
            <div className="navbar-popover-buttons-container">
              <Button
                className="navbar-profile-button navbar-button"
                onClick={signoutClickHandler}
                name="profile"
              >
                Profile
              </Button>
              <Button
                className="navbar-signout-button navbar-button"
                onClick={signoutClickHandler}
                name="signout"
              >
                Sign out
              </Button>
            </div>
          }
          trigger="click"
        >
          <Avatar
            icon={<UserOutlined />}
            src={
              profileState.profile.profileImage
                ? profileState.profile.profileImage
                : ""
            }
            className="navbar-avatar"
          ></Avatar>
          <div className="navbar-avatar-username">Shahbakht Anwar</div>
        </Popover>
        <Notifications className="navbar-notifications" />
      </div>
    </nav>
  );
};

export default NavBar;
