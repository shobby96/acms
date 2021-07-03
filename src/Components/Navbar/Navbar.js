import React, { useState } from "react";
import { Drawer, Button, Avatar, Popover } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import "./Navbar.css";
import { HomeOutlined } from "@ant-design/icons";
const NavBar = ({ menu }) => {
  const [visible, setVisible] = useState(false);
  return (
    <nav className="navbar">
      <Button
        className="navbar-menu-button"
        type="primary"
        icon={<MenuOutlined className="navbar-menu-icon" />}
        onClick={() => setVisible(true)}
      />
      <Drawer
        closable={false}
        placement="left"
        onClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        visible={visible}
        className="navbar-drawer"
      >
        {menu}
      </Drawer>
      <a href="/">
        <HomeOutlined className="navbar-home-icon" alt="logo" />
      </a>
      
      <Popover className="navbar-avatar-with-name" overlayClassName='navbar-avatar-popover-overlay' placement="bottomRight" title={'text'} content={'content'} trigger="click">
        <Avatar icon={<UserOutlined />} className='navbar-avatar'></Avatar>
        <div className="navbar-avatar-username">Shahbakht Anwar</div>
      </Popover>
    </nav>
  );
};
export default NavBar;
