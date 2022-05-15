import { Form, Input, Button } from "antd";
import { Redirect } from "react-router";
import "./Signup.css";
import "../Common/CSS/Common.css";
import "antd/dist/antd.css";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
// import { Auth, Hub } from "aws-amplify";
import { signout, signUp } from "../../Actions/AuthenticationActions";
const queryString = require("query-string");

const initialFormState = {
  username: "",
  password: "",
  email: "",
  authCode: "",
  formType: "signUp",
};

const Signup = (props) => {
  const [redirectRoute, updateRedirectRoute] = useState("");
  const onFinish = (values) => {
    signUpClickHandler(values);
  };

  const { loadingStatus, successObject } = useSelector(
    (state) => ({
      signUpState: state.signUp.signUpState,
      loadingStatus: state.signUp.loadingStatus,
      errorObject: state.signUp.errorObject,
      successObject: state.signUp.successObject,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signout());
  }, []);

  async function signUpClickHandler(values) {
    try {
      let url = "http://localhost:3050/users";
      let inviteToken = queryString.parse(props.location.search).token;
      if (inviteToken) {
        url = url + `?token=${inviteToken}`;
      }

      let requestBody = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      };
      dispatch(signUp(url, requestBody));
      localStorage.setItem("email", values.email);
    } catch (error) {
      console.log("error signing up:", error);
    }
  }

  if (Object.keys(successObject.signUp).length) {
    return <Redirect push to={"/"} />;
  }

  const onFinishFailed = (errorInfo) => {};

  if (redirectRoute) {
    return <Redirect push to={redirectRoute} />;
  }
  return (
    <div className="main">
      <div className="header">header</div>
      <div className="signup-content">
        <div className="common-workarea">
          <Form
            id="signup-form"
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div id="signup-form-title-text" className="common-center-text-div">
              Create your account
            </div>

            <Form.Item
              label="First Name"
              name="firstName"
              className="signup-form-item signup-first-name-formitem"
            >
              <Input className="signup-input" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              className="signup-form-item signup-form-item-spacing"
            >
              <Input className="signup-input" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              className="signup-form-item signup-form-item-spacing"
            >
              <Input className="signup-input" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              className="signup-form-item signup-form-item-spacing"
            >
              <Input.Password className="signup-input" />
            </Form.Item>

            <Form.Item
              label="Retype Password"
              name="repassword"
              className="signup-form-item signup-form-item-spacing"
            >
              <Input.Password className="signup-input" />
            </Form.Item>

            <div className="common-center-text-div" id="signup-button-div">
              <Button
                className="common-primary-button-style"
                id="signup-button"
                type="primary"
                htmlType="submit"
                loading={loadingStatus.signUpLoading}
              >
                Sign up
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <div className="footer">footer</div>
    </div>
  );
};

export default Signup;
