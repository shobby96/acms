import { Form, Input, Button, Checkbox } from "antd";
import { useState } from "react";
import "./Signin.css";
import "../Common/CSS/Common.css";
import { Redirect } from "react-router";

const Signin = () => {
  const [redirectRoute, updateRedirectRoute] = useState("");

  console.log("redirectRoute: ", redirectRoute);

  if (redirectRoute) {
    return <Redirect push to={redirectRoute} />;
  }
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
          >
            <div id="login-text-container" className="common-center-text-div">
              <span id="login-text">Login</span>
            </div>

            <Form.Item
              label="Email"
              name="email"
              className="login-form-item-width login-form-item login-form-item-spacing"
            >
              <Input className="login-input" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              className="login-form-item-width login-form-item login-form-item-spacing"
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
                onClick={() => updateRedirectRoute("/visitors")}
                htmlType="submit"
                shape="round"
              >
                Sign in
              </Button>
              <Button
                className="common-primary-button-style signup-button"
                onClick={() => updateRedirectRoute("/signup")}
                htmlType="submit"
                shape="round"
              >
                Sign up
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <div className="login-footer">Footer</div>
    </div>
  );
};

export default Signin;
