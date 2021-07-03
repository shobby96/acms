import "./UserDashboard.css";

import { Button, Avatar, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";

import "../Common/CSS/Common.css";
import Dashboard from "../Dashboard/Dashboard";
import { FamilyIcon, FriendIcon, WaitingIcon } from "../Dashboard/Icons";

const UserDashboard = () => {
  let content = (
    <div id="data-container">
      <div id="requests-text">Submit Requests</div>
      <Divider />

      <div className="userdashboard-grid">
        <div id="userdashboard-invite-details-container-div">
          <div id="userdashboard-family-icon-container">
            <FamilyIcon />
          </div>
          <div id="userdashboard-data-wrapper-div">
            <div id="userdashboard-invitee-details-container">
              <div id="userdashboard-invite-to-text">Invite Family</div>
              <div id="userdashboard-invitees-num-text">6 persons</div>

              <div id="userdashboard-invitees-visit-purpose-text">
                For Restaurant
              </div>
            </div>
            <div id="userdashboard-invite-status-div">
              <div className="userdashboard-date-time-text">
                {"Day"} {"Date"} - {"Time"}
              </div>
              <div id="userdashboard-waiting-icon">
                <WaitingIcon />
              </div>
              <div id="userdashboard-request-status-text">
                Please wait for an update
              </div>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      <Divider />

      <div className="userdashboard-grid">
        <div id="userdashboard-invite-details-container-div">
          <div id="userdashboard-family-icon-container">
            <FamilyIcon />
          </div>
          <div id="userdashboard-data-wrapper-div">
            <div id="userdashboard-invitee-details-container">
              <div id="userdashboard-invite-to-text">Invite Family</div>
              <div id="userdashboard-invitees-num-text">6 persons</div>

              <div id="userdashboard-invitees-visit-purpose-text">
                For Restaurant
              </div>
            </div>
            <div id="userdashboard-invite-status-div">
              <div className="userdashboard-date-time-text">
                {"Day"} {"Date"} - {"Time"}
              </div>
              <div id="userdashboard-waiting-icon">
                <WaitingIcon />
              </div>
              <div id="userdashboard-request-status-text">
                Please wait for an update
              </div>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* {<AddUserModal />} */}
      {/* {<CancelRequestModal></CancelRequestModal>} */}
    </div>
  );
  return <Dashboard menu="Dashboard" isAdmin={false} content={content} />;
};

export default UserDashboard;
