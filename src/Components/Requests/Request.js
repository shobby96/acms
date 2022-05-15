import { Form, Input, Button, DatePicker, TimePicker } from "antd";
import { Select } from "antd";
import moment from "moment";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router";
import "./Request.css";
import "../Common/CSS/Common.css";
import "antd/dist/antd.css";
import TextArea from "antd/lib/input/TextArea";
import {
  newRequest,
  resetRequestsSuccessState,
} from "../../Actions/RequestActions";
import { Redirect } from "react-router";

const Request = (props) => {
  const {
    // requestsState,
    profileState,
    loadingStatus,
    errorObject,
    successObject,
  } = useSelector(
    (state) => ({
      // requestsState: state.requests.requestsState,
      loadingStatus: state.requests.loadingStatus,
      errorObject: state.requests.errorObject,
      successObject: state.requests.successObject,
      profileState: state.signIn.profileState,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const history = useHistory();
  useEffect(() => {
    return function resetSuccessState() {
      dispatch(resetRequestsSuccessState());
    };
  }, []);

  const { Option } = Select;

  const onFinish = (values) => {
    values.date = moment(values.date).format("DD/MM/YYYY");
    values.time = moment(values.time).format("hh:mm:ss");

    let refreshToken = profileState["refresh_token"];
    let accessToken = profileState["access_token"];

    let headers = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    let url = "http://localhost:3050/requests";

    let requestBody = {
      invitationTo: values.invitee,
      reason: values.purpose,
      status: 0,
      invitationDate: values.date,
      invitationTime: values.time,
    };
    dispatch(newRequest(url, requestBody, headers));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (Object.keys(successObject.newRequest).length) {
    return <Redirect push to={"/visitors"} />;
  }
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
            <div id="request-form-title-text">Request</div>

            <Form.Item
              label="Invite"
              name="invitee"
              className="request-form-item request-invitee-type-formitem"
            >
              <Select className="request-select" defaultValue="family">
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
              label="Select Time"
              name="time"
              className="request-form-item request-form-item-spacing"
            >
              <TimePicker
                className="request-input request-date-input"
                placeholder={"Enter Time"}
                format={"HH:mm:ss"}
              />
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
              name="purpose"
              className="request-form-item request-form-item-spacing"
            >
              <TextArea
                className="request-input request-purpose-input"
                rows={5}
                placeholder={"Please enter reason for invitation"}
              />
            </Form.Item>

            <div className="common-center-text-div" id="request-button-div">
              <Button
                id="request-button"
                htmlType="submit"
                loading={loadingStatus.newRequestLoading}
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

export default Request;
