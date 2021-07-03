import { Form, Modal, Button, Input } from "antd";

import "./AddUserModal.css";

const CancelRequestModal = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Modal
      visible={true}
      footer={null}
      closable={false}
      className="add-user-modal"
    >
      <Form
        id="add-user-form"
        layout="vertical"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div id="add-user-modal-header-text">Add Users</div>
        <div id='add-user-instructions-text'>
          Thank you for getting back, please login to your accountby filling
          these form:
        </div>
        <Form.Item
          label="Email"
          name="email"
          className="add-user-form-item user-email-input"
        >
          <Input id='email-input'></Input>
        </Form.Item>

        <Button id="add-user-button" shape="round">
          Add
        </Button>
      </Form>
    </Modal>
  );
};

export default CancelRequestModal;
