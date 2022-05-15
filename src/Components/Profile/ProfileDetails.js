import React from "react";
import { useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

import DisplayImage from "../ProfileImage/ProfileImage";
import {
  getProfileDetails,
  updateUserProfile,
} from "../../Actions/ProfileActions";

import "./Profile.css";

const ProfileDetails = () => {
  const { profileState, loadingStatus } = useSelector(
    (state) => ({
      profileState: state.signIn.profileState,
      loadingStatus: state.signIn.loadingStatus,
    }),
    shallowEqual
  );
  let dispatch = useDispatch();

  const [inputFieldStatus, updateInputFieldStatus] = useState({
    firstName: true,
    lastName: true,
    email: true,
  });

  const { updateProfileLoading } = loadingStatus;
  useEffect(() => {
    getProfileDetailsHandler();
  }, []);

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

  const updateProfileDetailsHandler = (requestBody) => {
    let url = "http://localhost:3050/users/updateProfileInfo";
    let refreshToken = profileState["refresh_token"];
    let accessToken = profileState["access_token"];

    let headers = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    dispatch(updateUserProfile(url, requestBody, headers));
  };

  const editClickHandler = (e) => {
    updateInputFieldStatus({
      ...inputFieldStatus,
      [e.currentTarget.name]: !inputFieldStatus[e.currentTarget.name],
    });
  };
  const { profile } = profileState;

  let formSubmitHandler = (values) => {
    updateProfileDetailsHandler(values);
  };
  return (
    <React.Fragment>
      <Form
        id="profile-form"
        onFinish={formSubmitHandler}
        name="basic"
        initialValues={{
          email: profile["email"] ? profile["email"] : "sampleEmail",
          firstName: profile["firstName"] ? `${profile["firstName"]}` : "Name",
          lastName: profile["lastName"] ? `${profile["lastName"]}` : "Name",
        }}
      >
        <div className="profile-header-grid-item">
          <DisplayImage type={"profileImage"}></DisplayImage>
        </div>
        <div className="profile-form-title">Profile</div>
        <div className="profile-form-item-wrapper">
          <Form.Item
            label="Name"
            name="firstName"
            className="profile-form-item-width profile-form-item profile-form-item-spacing"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input
              className="profile-input"
              disabled={inputFieldStatus.firstName}
            />
          </Form.Item>
          <Button
            onClick={editClickHandler}
            className="profile-edit-button profile-form-item-spacing"
            icon={<EditOutlined />}
            name="firstName"
          ></Button>
        </div>

        <div className="profile-form-item-wrapper">
          <Form.Item
            label="Last Name"
            name="lastName"
            className="profile-form-item-width profile-form-item profile-form-item-spacing"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
            ]}
          >
            <Input
              className="profile-input"
              disabled={inputFieldStatus.lastName}
            />
          </Form.Item>
          <Button
            onClick={editClickHandler}
            className="profile-edit-button profile-form-item-spacing"
            icon={<EditOutlined />}
            name="lastName"
          ></Button>
        </div>

        <div className="profile-form-item-wrapper">
          <Form.Item
            label="Email"
            name="email"
            className="profile-form-item-width profile-form-item profile-form-item-spacing"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              className="profile-input"
              disabled={inputFieldStatus.email}
            />
          </Form.Item>

          <Button
            onClick={editClickHandler}
            className="profile-edit-button profile-form-item-spacing"
            icon={<EditOutlined />}
            name="email"
          ></Button>
        </div>

        <Button
          className="common-primary-button-style profile-submit-button"
          htmlType="submit"
          shape="round"
          loading={updateProfileLoading}
        >
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default ProfileDetails;
