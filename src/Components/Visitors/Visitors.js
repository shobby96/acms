import { Button, Avatar, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";

import "../Common/CSS/Common.css";
import "antd/dist/antd.css";
import "./Visitors.css";

import Dashboard from "../Dashboard/Dashboard";

const Visitors = () => {
  let content = (
    <div id="visitors-section-div">
      <div id="visitors-title-div">Requests</div>
      <div className="visitors-data-row-container-div">
        <Divider />
        <div id="visitors-data-row-div">
          <div className="visitors-avatar-with-name-container-div visitors-data-column-div visitors-name-column-div">
            <Avatar icon={<UserOutlined />}></Avatar>
            <div className="visitors-avatar-username-text">Shahbakht Anwar</div>
          </div>
          <div className="visitors-data-column-div visitors-invite-details-column-div">
            <div id="visitors-invitee-details-container">
              <div id="visitors-invite-to-text">Invite Family</div>
              <div id="visitors-invitees-num-text">6 persons</div>
              <div className="visitors-date-time-text">
                {"Day"} {"Date"} - {"Time"}
              </div>
              <div id="visitors-invitees-visit-purpose-text">
                For Restaurant
              </div>
            </div>
          </div>
          <div className="visitors-data-column-div visitors-action-buttons-column-div">
            <div className="visitors-action-button-container">
              <Button className="visitors-accept-button">Accept</Button>
              <Button className="visitors-reject-button">Reject</Button>
            </div>
          </div>
        </div>
        <Divider />
      </div>
      
      <div className="visitors-data-row-container-div">
        <Divider />
        <div id="visitors-data-row-div">
          <div className="visitors-avatar-with-name-container-div visitors-data-column-div visitors-name-column-div">
            <Avatar icon={<UserOutlined />}></Avatar>
            <div className="visitors-avatar-username-text">Shahbakht Anwar</div>
          </div>
          <div className="visitors-data-column-div visitors-invite-details-column-div">
            <div id="visitors-invitee-details-container">
              <div id="visitors-invite-to-text">Invite Family</div>
              <div id="visitors-invitees-num-text">6 persons</div>
              <div className="visitors-date-time-text">
                {"Day"} {"Date"} - {"Time"}
              </div>
              <div id="visitors-invitees-visit-purpose-text">
                For Restaurant
              </div>
            </div>
          </div>
          <div className="visitors-data-column-div visitors-action-buttons-column-div">
            <div className="visitors-action-button-container">
              <Button className="visitors-accept-button">Accept</Button>
              <Button className="visitors-reject-button">Reject</Button>
            </div>
          </div>
        </div>
        <Divider />
      </div>
      
      <div className="visitors-data-row-container-div">
        <Divider />
        <div id="visitors-data-row-div">
          <div className="visitors-avatar-with-name-container-div visitors-data-column-div visitors-name-column-div">
            <Avatar icon={<UserOutlined />}></Avatar>
            <div className="visitors-avatar-username-text">Shahbakht Anwar</div>
          </div>
          <div className="visitors-data-column-div visitors-invite-details-column-div">
            <div id="visitors-invitee-details-container">
              <div id="visitors-invite-to-text">Invite Family</div>
              <div id="visitors-invitees-num-text">6 persons</div>
              <div className="visitors-date-time-text">
                {"Day"} {"Date"} - {"Time"}
              </div>
              <div id="visitors-invitees-visit-purpose-text">
                For Restaurant
              </div>
            </div>
          </div>
          <div className="visitors-data-column-div visitors-action-buttons-column-div">
            <div className="visitors-action-button-container">
              <Button className="visitors-accept-button">Accept</Button>
              <Button className="visitors-reject-button">Reject</Button>
            </div>
          </div>
        </div>
        <Divider />
      </div>
      
      {/* {<AddUserModal />} */}
      {/* {<CancelRequestModal></CancelRequestModal>} */}
    </div>
  );

  return <Dashboard menu="Visitor" content={content} isAdmin={true} />;
};

export default Visitors;
