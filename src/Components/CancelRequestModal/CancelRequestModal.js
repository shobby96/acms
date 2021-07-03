import { Form, Modal, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";

import './CancelRequestModal.css'

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
      className="cancellation-modal"
    >
      <Form
        id="cancel-request-form"
        layout="vertical"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div id="cancellation-modal-header-text">Please tell Reason</div>

        <Form.Item
          label="Reason"
          name="username"
          className="cancel-request-form-item cancellation-reason-input"
        >
          <TextArea
            rows={5}
            placeholder={"Please explain reason for cancellation here"}
          ></TextArea>
        </Form.Item>

        <Button id="submit-reason-button" shape="round">
          Submit
        </Button>
      </Form>
    </Modal>
  );
};

export default CancelRequestModal;
