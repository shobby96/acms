import { Form, Modal, Button, Input } from "antd";
import { useRef } from "react";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  addUser,
  resetAddUserSuccessState,
} from "../../Actions/OrganizationsActions";
import "./AddUserModal.css";

const AddUserModal = (props) => {
  const { profileState, loadingStatus, successObject } = useSelector(
    (state) => ({
      profileState: state.signIn.profileState,
      addUserState: state.organizations.addUserState,
      loadingStatus: state.organizations.loadingStatus.addUserLoading,
      successObject: state.organizations.successObject.addUser,
      errorObject: state.organizations.errorObject,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
  const formRef = useRef();
  useEffect(() => {
    return () => {
      "unmounting";
    };
  }, []);

  let addMemberApiCallHandler = (email) => {
    let refreshToken = profileState["refresh_token"];
    let accessToken = profileState["access_token"];
    let headers = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    let url = "http://localhost:3050/users/invite";
    let requestBody = {
      email: email,
    };

    dispatch(addUser(url, requestBody, headers));
  };

  const onFinish = (values) => {
    if (values.email) {
      addMemberApiCallHandler(values.email);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  let visibility = "visibility" in props ? props.visibility : false;
  // If request to add user is successful, dismiss modal
  if (Object.keys(successObject).length) {
    // updateVisibility(false);
    props.updateVisibility(false);
    // formRef.resetFields();
    formRef.current.resetFields();
    dispatch(resetAddUserSuccessState());
  }

  return (
    <Modal
      visible={visibility}
      footer={null}
      closable={false}
      className="add-user-modal"
      onCancel={() => props.updateVisibility(false)}
    >
      <Form
        id="add-user-form"
        layout="vertical"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        ref={formRef}
      >
        <div id="add-user-modal-header-text">Add Users</div>
        <div id="add-user-instructions-text">
          An invitation containing temporary credentials to join the
          organization will be sent
        </div>
        <Form.Item
          label="Email"
          name="email"
          className="add-user-form-item user-email-input"
        >
          <Input id="email-input"></Input>
        </Form.Item>

        <Button
          id="add-user-button"
          shape="round"
          htmlType="submit"
          loading={loadingStatus}
        >
          Add
        </Button>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
