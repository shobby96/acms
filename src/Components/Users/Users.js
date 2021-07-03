import Dashboard from "../Dashboard/Dashboard";
import { Avatar, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import "./Users.css";
const Users = () => {
  const content = (
    <div className="user-content-container">
    

      <div className="user-info-card">
        <Avatar className="user-avatar"></Avatar>
        <div className="user-info">
          <div>Shahbakht Anwar</div>
          <div>shahbakht.anwar@gmail.com</div>
        </div>
        <div className="user-actions">
          <Button icon={<EditOutlined />} className='edit-button'></Button>
          <Button icon={<DeleteOutlined />} className='delete-button'></Button>
        </div>
      </div>

      <div className="user-info-card">
        <Avatar className="user-avatar"></Avatar>
        <div className="user-info">
          <div>Shahbakht Anwar</div>
          <div>shahbakht.anwar@gmail.com</div>
        </div>
        <div className="user-actions">
          <Button icon={<EditOutlined />} className='edit-button'></Button>
          <Button icon={<DeleteOutlined />} className='delete-button'></Button>
        </div>
      </div>

      <div className="user-info-card">
        <Avatar className="user-avatar"></Avatar>
        <div className="user-info">
          <div>Shahbakht Anwar</div>
          <div>shahbakht.anwar@gmail.com</div>
        </div>
        <div className="user-actions">
          <Button icon={<EditOutlined />} className='edit-button'></Button>
          <Button icon={<DeleteOutlined />} className='delete-button'></Button>
        </div>
      </div>

      <div className="user-info-card">
        <Avatar className="user-avatar"></Avatar>
        <div className="user-info">
          <div>Shahbakht Anwar</div>
          <div>shahbakht.anwar@gmail.com</div>
        </div>
        <div className="user-actions">
          <Button icon={<EditOutlined />} className='edit-button'></Button>
          <Button icon={<DeleteOutlined />} className='delete-button'></Button>
        </div>
      </div>



    </div>
  );
  return <Dashboard menu="Users" content={content} isAdmin={true}/>;
};

export default Users;
