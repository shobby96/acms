import React, { useState, useEffect } from "react";
import { Button, Form, Input, Divider, message } from "antd";
import { LoadingOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import {
  getOrganization,
  resetUpdateOrganizationState,
  putOrganizationInfo,
} from "../../Actions/OrganizationsActions";
import DisplayImage from "../ProfileImage/ProfileImage";

import "./OrganizationDetails.css";

const OrganizationDetails = () => {
  const { profileState, getOrganizationState, loadingStatus, successObject } =
    useSelector(
      (state) => ({
        profileState: state.signIn.profileState,
        getOrganizationState: state.organizations.getOrganizationState,
        loadingStatus: state.organizations.loadingStatus,
        successObject: state.organizations.successObject,
        errorObject: state.organizations.errorObject,
      }),
      shallowEqual
    );

  const dispatch = useDispatch();

  const getOrganizationdetailsHandler = () => {
    let accessToken = profileState["access_token"];
    let refreshToken = profileState["refresh_token"];
    let headers = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    let url = "http://localhost:3050/organizations";
    dispatch(getOrganization(url, headers));
  };

  const updateOrganizationInfoHandler = (requestBody = {}) => {
    let accessToken = profileState["access_token"];
    let refreshToken = profileState["refresh_token"];
    let headers = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    let url = "http://localhost:3050/organizations/updateOrganizationInfo";
    dispatch(putOrganizationInfo(url, requestBody, headers));
  };

  useEffect(() => {
    getOrganizationdetailsHandler();
  }, []);

  const [loading, updateLoadingStatus] = useState(false);
  const [inputFieldStatus, updateInputFieldStatus] = useState({
    name: true,
    email: true,
    twitter: true,
    facebook: true,
    instagram: true,
  });
  const { updateOrganizationInfoLoading } = loadingStatus;
  const { updateOrganizationInfo } = successObject;

  useEffect(() => {
    return () => {
      dispatch(resetUpdateOrganizationState());
    };
  }, []);

  useEffect(() => {
    if (
      updateOrganizationInfo.message &&
      updateOrganizationInfo.message.length
    ) {
      message.success(updateOrganizationInfo.message);
    }
  }, [JSON.stringify(updateOrganizationInfo).length]);

  const editClickHandler = (e) => {
    updateInputFieldStatus({
      ...inputFieldStatus,
      [e.currentTarget.name]: !inputFieldStatus[e.currentTarget.name],
    });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  let organizationInfo = Object.keys(getOrganizationState).length
    ? getOrganizationState["organization"]
    : {};

  let organizationFormSubmitHandler = (values) => {
    updateOrganizationInfoHandler(values);
  };
  return (
    <React.Fragment>
      <Form
        id="organization-form"
        name="basic"
        onFinish={organizationFormSubmitHandler}
        initialValues={{
          email: organizationInfo["email"]
            ? organizationInfo["email"]
            : "sampleEmail",
          name: organizationInfo["name"]
            ? organizationInfo["name"]
            : "Organization Name",
          twitter: organizationInfo["twitter"]
            ? organizationInfo["twitter"]
            : "",
          facebook: organizationInfo["facebook"]
            ? organizationInfo["facebook"]
            : "",
          insta: organizationInfo["insta"] ? organizationInfo["insta"] : "",
        }}
        //   onFinish={onFinish}
      >
        {/* {organizationHeader()} */}
        <DisplayImage type={"organizationImage"}></DisplayImage>
        <div className="organization-form-title">Organization</div>

        <Divider />
        <div className="organization-form-item-wrapper">
          <Form.Item
            label="Name"
            name="name"
            className="organization-form-item-width organization-form-item organization-form-item-spacing"
            rules={[
              {
                required: true,
                message: "Please input your organization's name!",
              },
            ]}
          >
            <Input
              className="organization-input"
              disabled={inputFieldStatus.name}
            />
          </Form.Item>
          <Button
            onClick={editClickHandler}
            className="organization-edit-button organization-form-item-spacing"
            icon={<EditOutlined />}
            name="name"
          ></Button>
        </div>

        <div className="organization-form-item-wrapper">
          <Form.Item
            label="Email"
            name="email"
            className="organization-form-item-width organization-form-item organization-form-item-spacing"
            rules={[
              {
                required: true,
                message: "Please input your organization's email!",
              },
            ]}
          >
            <Input
              className="organization-input"
              disabled={inputFieldStatus.email}
            />
          </Form.Item>

          <Button
            onClick={editClickHandler}
            className="organization-edit-button organization-form-item-spacing"
            icon={<EditOutlined />}
            name="email"
          ></Button>
        </div>

        <div className="organization-form-item-wrapper">
          <Form.Item
            label="Twitter"
            name="twitter"
            className="organization-form-item-width organization-form-item organization-form-item-spacing"
            rules={[
              {
                // required: true,
                message: "Please input your organization's email!",
              },
            ]}
          >
            <Input
              className="organization-input"
              disabled={inputFieldStatus.twitter}
            />
          </Form.Item>

          <Button
            onClick={editClickHandler}
            className="organization-edit-button organization-form-item-spacing"
            icon={<EditOutlined />}
            name="twitter"
          ></Button>
        </div>

        <div className="organization-form-item-wrapper">
          <Form.Item
            label="Facebook"
            name="facebook"
            className="organization-form-item-width organization-form-item organization-form-item-spacing"
            rules={[
              {
                // required: true,
                message: "Please input your organization's email!",
              },
            ]}
          >
            <Input
              className="organization-input"
              disabled={inputFieldStatus.facebook}
            />
          </Form.Item>

          <Button
            onClick={editClickHandler}
            className="organization-edit-button organization-form-item-spacing"
            name="facebook"
            icon={<EditOutlined />}
          ></Button>
        </div>

        <div className="organization-form-item-wrapper">
          <Form.Item
            label="Instagram"
            name="insta"
            className="organization-form-item-width organization-form-item organization-form-item-spacing"
            rules={[
              {
                // required: true,
                message: "Please input your organization's email!",
              },
            ]}
          >
            <Input
              className="organization-input"
              disabled={inputFieldStatus["instagram"]}
            />
          </Form.Item>

          <div className="organization-edit-button organization-form-item-spacing">
            <Button
              onClick={editClickHandler}
              id={1}
              name="instagram"
              icon={<EditOutlined />}
            ></Button>
          </div>
        </div>

        <Button
          className="common-primary-button-style organization-submit-button"
          htmlType="submit"
          shape="round"
          loading={updateOrganizationInfoLoading}
        >
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default OrganizationDetails;
