import React, { useState, useEffect } from "react";
import {
  Button,
  Menu,
  Layout,
  Form,
  Input,
  Upload,
  Divider,
  message,
} from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  PieChartOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { getOrganization } from "../../Actions/OrganizationsActions";
import NavBar from "../Navbar/Navbar";
import "./Organization.css";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const getUserAttribute = (attributeName, userAttributes) => {
  let id;
  for (var index in userAttributes) {
    if (userAttributes[index]["Name"] === attributeName)
      id = userAttributes[index]["Value"];
    continue;
  }
  return id;
};

const Organization = (props) => {
  const {
    profileState,
    getOrganizationState,
    loadingStatus,
    successObject,
    errorObject,
  } = useSelector(
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
  useEffect(() => {
    // let userAttributes = profileState["profile"]["UserAttributes"];
    // let id = getUserAttribute("custom:id", userAttributes);
    // let idToken = profileState["authenticationToken"]["IdToken"];
    // let accessToken = profileState["authenticationToken"]["AccessToken"];
    // let headers = {
    //   Authorization: accessToken,
    //   AccessToken: accessToken,
    // };
    // let url =
    //   "https://qz8a0nzf5b.execute-api.us-east-1.amazonaws.com/dev/organizations";
    // dispatch(getOrganization(url, headers));
    getOrganizationdetailsHandler();
  }, []);

  const [loading, updateLoadingStatus] = useState(false);
  const [collapsed, updateCollapsedState] = useState(false);
  const [imageUrl, updateImageUrl] = useState("");
  const [inputFieldStatus, updateInputFieldStatus] = useState({
    name: true,
    email: true,
    twitter: true,
    facebook: true,
    instagram: true,
  });

  let handleChange = (info) => {
    console.log(`File Status Info: ${JSON.stringify(info)}`);
    if (info.file.status === "uploading") {
      updateLoadingStatus(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        updateLoadingStatus(false);
        updateImageUrl(imageUrl);
      });
    }
    if (info.file.status === "error") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        updateLoadingStatus(false);
        updateImageUrl(imageUrl);
      });
    }
  };

  const editClickHandler = (e) => {
    // console.log(e.currentTarget.id);
    console.log(e.currentTarget.name);
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

  let organizationHeader = () => {
    return (
      <React.Fragment>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://cors-anywhere.herokuapp.com/https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
        <div className="organization-name-div">{}</div>
      </React.Fragment>
    );
  };

  let organizationDetails = () => {
    let organizationInfo = {};
    if (Object.keys(getOrganizationState).length) {
      organizationInfo = getOrganizationState["organization"];
      console.log("getOrganizationState: ", organizationInfo);
    }
    console.log("organizationInfo: ", organizationInfo);
    return (
      <React.Fragment>
        <Form
          id="organization-form"
          // layout="vertical"
          name="basic"
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
                  required: true,
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
                  required: true,
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
                  required: true,
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
            loading={loadingStatus.signInLoading}
          >
            Submit
          </Button>
        </Form>
      </React.Fragment>
    );
  };
  return (
    <div className="main">
      <NavBar props={props} />
      <div className="organization-content">
        <div className="organization-content-grid-item">
          <Layout.Sider
            className="sidebar"
            breakpoint={"lg"}
            theme="light"
            collapsedWidth={0}
            trigger={null}
            className={"organization-sider-menu"}
          >
            <Menu
              // theme="dark"
              inlineCollapsed={collapsed}
              // className={"organization-sider-menu"}
            >
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                Organization Profile
              </Menu.Item>
            </Menu>
          </Layout.Sider>
          <div className="organization-content-wrapper">
            <div className="organization-header-grid-item">
              {organizationHeader()}
            </div>
            {organizationDetails()}
          </div>
        </div>
        {/* <div className="organization-footer-grid-item">
          <div className="organization-socials-container-div">
            <FacebookOutlined className="organization-socials-icon" />
            <TwitterOutlined className="organization-socials-icon" />
            <InstagramOutlined className="organization-socials-icon" />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Organization;
