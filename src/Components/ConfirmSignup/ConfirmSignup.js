import { useState } from "react";
import { Redirect } from "react-router";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { InputNumber, Form, Button } from "antd";

import { confrimSignUp } from "../../Actions/AuthenticationActions";

import "./ConfirmSignup.css";

const ConfirmSignup = () => {
  const { loadingStatus, successObject } = useSelector(
    (state) => ({
      confirmSignUpState: state.signUp.confirmSignUpState,
      loadingStatus: state.signUp.loadingStatus,
      errorObject: state.signUp.errorObject,
      successObject: state.signUp.successObject,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const [redirectRoute, updateRedirectRoute] = useState("");
  const onFinish = (values) => {
    let authCodeArray = Object.values(values);
    let authCode = "";
    authCodeArray.forEach((item, index) => (authCode = authCode + item));
    confirmSignUpHandler(authCode);
  };

  async function confirmSignUpHandler(authCode) {
    try {
      let url =
        "https://qz8a0nzf5b.execute-api.us-east-1.amazonaws.com/dev/confirm";
      let email = localStorage.getItem("email");
      let requestBody = {
        verification_code: authCode,
        email: email,
      };
      dispatch(confrimSignUp(url, requestBody));
    } catch (err) {
      console.log("confirmSignUpError: ", err);
    }
  }

  if (Object.keys(successObject.confirmSignUp).length) {
    return <Redirect to={"/"} />;
  }

  if (redirectRoute) {
    return <Redirect to={"/"} />;
  }

  let component = (
    <div className="main">
      <div className="header">header</div>
      <div className="confirm-signup-content">
        <div className="confirm-signup-workarea">
          <Form id="confirm-signup-form" onFinish={onFinish}>
            <span id="confirm-signup-form-title-span">Verify</span>
            <div className="confirm-signup-code-container-div">
              <Form.Item className="confirm-signup-code-inputnumber" name={1}>
                <InputNumber min={0} max={9} maxLength={1}></InputNumber>
              </Form.Item>
              <Form.Item className="confirm-signup-code-inputnumber" name={2}>
                <InputNumber min={0} max={9} maxLength={1}></InputNumber>
              </Form.Item>
              <Form.Item className="confirm-signup-code-inputnumber" name={3}>
                <InputNumber min={0} max={9} maxLength={1}></InputNumber>
              </Form.Item>
              <Form.Item className="confirm-signup-code-inputnumber" name={4}>
                <InputNumber min={0} max={9} maxLength={1}></InputNumber>
              </Form.Item>
              <Form.Item className="confirm-signup-code-inputnumber" name={5}>
                <InputNumber min={0} max={9} maxLength={1}></InputNumber>
              </Form.Item>
              <Form.Item className="confirm-signup-code-inputnumber" name={6}>
                <InputNumber min={0} max={9} maxLength={1}></InputNumber>
              </Form.Item>
            </div>

            <Button
              htmlType="submit"
              className="common-primary-button-style confirm-signup-submit-button"
              loading={loadingStatus.confirmSignUpLoading}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
  return component;
};

export default ConfirmSignup;
