import React from "react";
import { useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Layout, Menu, message, Spin } from "antd";
import { PieChartOutlined } from "@ant-design/icons";

import NavBar from "../Navbar/Navbar";
import OrganizationDetails from "./OrganizationDetails";
import ProfileDetails from "./ProfileDetails";
import {
  getProfileDetails,
  resetUpdateProfileState,
} from "../../Actions/ProfileActions";

import "./Profile.css";

const Profile = (props) => {
  const {
    profileState,
    loadingStatus,
    successObject,
    organizationsLoadingStatus,
  } = useSelector(
    (state) => ({
      profileState: state.signIn.profileState,
      loadingStatus: state.signIn.loadingStatus,
      successObject: state.signIn.successObject,
      organizationsLoadingStatus: state.organizations.loadingStatus,
    }),
    shallowEqual
  );
  let { getProfileLoading, updateProfileLoading } = loadingStatus;
  let { getOrganizationLoading, updateOrganizationInfoLoading } =
    organizationsLoadingStatus;
  let dispatch = useDispatch();
  let { updateProfile: updateProfileSuccessObject } = successObject;

  const [collapsed, updateCollapsedState] = useState(false);
  const [subComponent, updateSubComponent] = useState("Profile");
  const [inputFieldStatus, updateInputFieldStatus] = useState({
    name: true,
    email: true,
  });

  useEffect(() => {
    if (
      updateProfileSuccessObject.message &&
      updateProfileSuccessObject.message.length
    ) {
      message.success(updateProfileSuccessObject.message);
    }
  }, [JSON.stringify(updateProfileSuccessObject).length]);

  useEffect(() => {
    getProfileDetailsHandler();

    return () => {
      dispatch(resetUpdateProfileState());
    };
  }, []);

  let menuItemClickHandler = (e) => {
    switch (e.key) {
      case "Profile":
        updateSubComponent("Profile");
        break;
      case "Organization":
        updateSubComponent("Organization");
        break;
      default:
        break;
    }
  };

  const getProfileDetailsHandler = () => {
    let url = "http://localhost:3050/users/myprofile";
    let refreshToken = profileState["refresh_token"];
    let accessToken = profileState["access_token"];

    let headers = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    dispatch(getProfileDetails(url, headers));
  };

  const { profile } = profileState;

  let content = () => {
    switch (subComponent) {
      case "Profile":
        return <ProfileDetails />;

      case "Organization":
        return <OrganizationDetails />;
      default:
        break;
    }
  };

  let siderMenu = () => {
    return (
      <Menu
        // theme="dark"
        inlineCollapsed={collapsed}
        className="profile-sider-menu"
        onClick={menuItemClickHandler}
        defaultSelectedKeys={["Profile"]}

        // className={"profile-sider-menu"}
      >
        <Menu.Item
          key="Profile"
          icon={<PieChartOutlined />}
          className="profile-sider-menu-item"
          name="profile"
        >
          Profile
        </Menu.Item>
        <Menu.Item
          key="Organization"
          icon={<PieChartOutlined />}
          className="profile-sider-menu-item"
          name="organization"
        >
          Organization
        </Menu.Item>
      </Menu>
    );
  };
  return (
    <Spin
      wrapperClassName="profile-spin"
      spinning={
        getProfileLoading ||
        updateProfileLoading ||
        getOrganizationLoading ||
        updateOrganizationInfoLoading
      }
    >
      <div className="main">
        <NavBar menu={siderMenu} props={props} />
        <div className="profile-content">
          <div className="profile-content-grid-item">
            <Layout.Sider
              className="profile-sidebar"
              breakpoint={"lg"}
              theme="light"
              collapsedWidth={0}
              trigger={null}
              // className={"profile-sider-menu"}
            >
              {siderMenu()}
            </Layout.Sider>
            <div className="profile-content-container">{content()}</div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Profile;
