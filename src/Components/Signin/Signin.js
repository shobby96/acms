import { Form, Input, Button, Checkbox, Divider, message } from "antd";
import { useEffect, useState } from "react";
import "./Signin.css";
import "../Common/CSS/Common.css";
import { Redirect } from "react-router";
// import { Auth } from "aws-amplify";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { signIn } from "../../Actions/AuthenticationActions";
import { GoogleOutlined } from "@ant-design/icons";

const Signin = () => {
  const [redirectRoute, updateRedirectRoute] = useState("");
  const {
    signInState,
    profileState,
    loadingStatus,
    errorObject,
    successObject,
  } = useSelector(
    (state) => ({
      signInState: state.signIn.signInState,
      profileState: state.signIn.profileState,
      loadingStatus: state.signIn.loadingStatus,
      errorObject: state.signIn.errorObject,
      successObject: state.signIn.successObject,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  let { signIn: signInErrorObject } = errorObject;
  let signInErrorMessage = "";
  if (
    signInErrorObject &&
    signInErrorObject.message &&
    signInErrorObject.message.length
  ) {
    signInErrorMessage = signInErrorObject.message;
  }
  useEffect(() => {
    if (signInErrorMessage) message.error(signInErrorMessage);
  }, [signInErrorMessage]);

  try {
    if (Object.keys(profileState.profile).length) {
      if (profileState["profile"]) {
        let attributes = profileState["profile"];
        for (var key in attributes) {
          if (key === "organizationID")
            return <Redirect push to={"/visitors"} />;
        }
        return <Redirect push to={"/addOrganization"} />;
      }
    }
  } catch (err) {
    return <Redirect push to={"/addOrganization"} />;
  }

  if (redirectRoute) {
    return <Redirect push to={redirectRoute} />;
  }

  function signInHandler(username, password) {
    let url = "http://localhost:3050/signin";
    let credentials = {
      grant_type: "password",
      username: username,
      password: password,
    };
    dispatch(signIn(url, credentials));
  }

  const onFinish = (values) => {
    signInHandler(values.email, values.password);
  };

  return (
    <div className="main">
      <div className="login-header">Header</div>
      <div className="login-content">
        <div className="common-workarea">
          <Form
            id="login-form"
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <div id="login-text-container" className="common-center-text-div">
              <span id="login-text">To continue login to portal.</span>
            </div>

            <Form.Item className="login-form-item-width">
              <Button
                className="login-google-button"
                icon={<GoogleOutlined />}
                shape={"round"}
              >
                Continue with Google
              </Button>
            </Form.Item>

            <Divider className="login-divider-or-text">or</Divider>
            <Form.Item
              label="Email"
              name="email"
              className="login-form-item-width login-form-item login-form-item-spacing"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input className="login-input" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              className="login-form-item-width login-form-item login-form-item-spacing"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password className="login-input" />
            </Form.Item>

            <div id="login-info-div">
              <Form.Item
                name="remember"
                valuePropName="checked"
                className="login-form-item"
              >
                <Checkbox className="login-rememberme-checkbox">
                  Remember me
                </Checkbox>
              </Form.Item>
              <span id="forgot-password-span">Forgot Password</span>
            </div>

            <div className="common-center-text-div" id="login-button-div">
              <Button
                className="common-primary-button-style login-button"
                htmlType="submit"
                shape="round"
                loading={loadingStatus.signInLoading}
              >
                Log in
              </Button>
            </div>
            <div className="login-signup-section">
              <div className="login-no-account-text">
                Don't have an account?
              </div>
              <Form.Item className="login-form-item-width">
                <Button
                  className="signup-button"
                  onClick={() => updateRedirectRoute("/signup")}
                  shape="round"
                >
                  Sign up
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
      <div className="login-footer">Footer</div>
    </div>
  );
};

export default Signin;
