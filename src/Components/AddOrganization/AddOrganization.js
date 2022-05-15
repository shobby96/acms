import { Form, Input, Button } from "antd";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";

import { addOrganization } from "../../Actions/OrganizationsActions";

import "./AddOrganization.css";
import "../Common/CSS/Common.css";
import "antd/dist/antd.css";

const AddOrganization = () => {
  const { loadingStatus, successObject, profileState } = useSelector(
    (state) => ({
      addOrganizationState: state.organizations.addOrganizationState,
      loadingStatus: state.organizations.loadingStatus,
      errorObject: state.organizations.errorObject,
      successObject: state.organizations.successObject,
      profileState: state.signIn.profileState,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  async function addOrganizationHandler(values) {
    try {
      let url = "http://localhost:3050/organizations";
      let refreshToken = profileState["refresh_token"];
      let accessToken = profileState["access_token"];

      let headers = {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };

      let requestBody = {
        name: values.name,
        email: values.email,
        twitter: values.twitter ? values.twitter : "",
        facebook: values.facebook ? values.facebook : "",
        insta: values.insta ? values.insta : "",
      };
      dispatch(addOrganization(url, requestBody, headers));
    } catch (err) {
      console.log("confirmSignUpError: ", err);
    }
  }
  const onFinish = (values) => {
    addOrganizationHandler(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (Object.keys(successObject.addOrganization).length) {
    return <Redirect push to={"/visitors"} />;
  }

  return (
    <div className="main">
      <div className="header">header</div>
      <div className="add-organization-content">
        <div className="add-organization-workarea">
          <Form
            id="add-organization-form"
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div id="add-organization-form-title-text">Add Organization</div>

            <Form.Item
              label="Name"
              name="name"
              className="add-organization-form-item add-organization-name-form-item"
            >
              <Input className="add-organization-input"></Input>
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              className="add-organization-form-item add-organization-form-item-spacing"
            >
              <Input className="add-organization-input add-organization-date-input" />
            </Form.Item>

            <Form.Item
              label="Twitter"
              name="twitter"
              className="add-organization-form-item add-organization-form-item-spacing"
            >
              <Input className="add-organization-input add-organization-date-input" />
            </Form.Item>

            <Form.Item
              label="Insta"
              name="insta"
              className="add-organization-form-item add-organization-form-item-spacing"
            >
              <Input className="add-organization-input add-organization-date-input" />
            </Form.Item>

            <Form.Item
              label="Facebook"
              name="facebook"
              className="add-organization-form-item add-organization-form-item-spacing"
            >
              <Input className="add-organization-input add-organization-date-input" />
            </Form.Item>

            <div
              className="common-center-text-div"
              id="add-organization-button-div"
            >
              <Button
                id="add-organization-button"
                htmlType="submit"
                loading={loadingStatus.addOrganizationLoading}
              >
                Request
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <div className="footer">footer</div>
    </div>
  );
};

export default AddOrganization;
