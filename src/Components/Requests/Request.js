import { Form, Input, Button, DatePicker } from "antd";
import { Select } from "antd";

import "./Request.css";
import "../Common/CSS/Common.css";
import "antd/dist/antd.css";
import TextArea from "antd/lib/input/TextArea";

const Request = () => {
  const { Option } = Select;
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="main">
      <div className="header">header</div>
      <div className="request-content">
        <div className="request-workarea">
          <Form
            id="request-form"
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div id="request-form-title-text">
              Request
            </div>

            <Form.Item
              label="Invite"
              name="invitee"
              className="request-form-item request-invitee-type-formitem"
            >
              <Select
                className='request-select'
                defaultValue="family"  
              >
                <Option value="Friends">Friends</Option>
                <Option value="family">Family</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Select Date"
              name="date"
              className="request-form-item request-form-item-spacing"
            >
              <DatePicker className="request-input request-date-input" />
            </Form.Item>

            <Form.Item
              label="Persons"
              name="persons"
              className="request-form-item request-form-item-spacing"
            >
              <Input
                className="request-input request-persons-input"
                placeholder={
                  "Please enter number of persons you want to invite"
                }
              />
            </Form.Item>

            <Form.Item
              label="Purpose"
              name="Purpose"
              className="request-form-item request-form-item-spacing"
            >
              <TextArea
                className="request-input request-purpose-input"
                rows={5}
                placeholder={"Please enter reason for invitation"}
              />
            </Form.Item>

            <div className="common-center-text-div" id="request-button-div">
              <Button id="request-button"  htmlType="submit">
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

export default Request;
