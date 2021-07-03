import { Form, Input, Button, Checkbox } from "antd";

import "./Signup.css";
import "../Common/CSS/Common.css";
import "antd/dist/antd.css";

const Signup = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
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
              name="username"
              className="signup-form-item signup-first-name-formitem"
            >
              <Input className="signup-input" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastname"
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
              <Button className='common-primary-button-style'id="signup-button" type="primary" htmlType="submit">
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
