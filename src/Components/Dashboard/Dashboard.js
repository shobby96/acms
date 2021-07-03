import React, { useState } from "react";
import { Button, Menu, Layout } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import NavBar from "../Navbar/Navbar";
import {
  DashboardIcon,
  HistoryIcon,
  LogoutIcon,
  NotificationIcon,
  UserIcon,
  VisitorIcon,
} from "./Icons";
import useWindowDimensions from "./WindowDimensionsHook";

import "./Dashboard.css";
import "../Common/CSS/Common.css";
import "antd/dist/antd.css";
import { Redirect } from "react-router";

const Dashboard = (props) => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { height, width } = useWindowDimensions();
  console.log("height: ", height, "width: ", width);
  const [redirectRoute, updateRedirectRoute] = useState("");
  if (redirectRoute) {
    return <Redirect push to={redirectRoute} />;
  }
  const fontSize = "calc(70px + (100 - 70) * ((100vw - 300px) / (1600 - 300)))";
  const color = "white";
  const adminSider = (
    <React.Fragment>
      <Menu.Item
        className="icon"
        icon={<VisitorIcon style={{ fontSize: fontSize, color: color }} />}
      ></Menu.Item>
      <Menu.Item
        className="icon"
        icon={<UserIcon style={{ fontSize: fontSize, color: color }} />}
      ></Menu.Item>
      <Menu.Item
        className="icon"
        icon={<NotificationIcon style={{ fontSize: fontSize, color: color }} />}
      ></Menu.Item>
      <Menu.Item
        className="icon"
        icon={<HistoryIcon style={{ fontSize: fontSize, color: color }} />}
      ></Menu.Item>
      <Menu.Item
        className="icon"
        icon={<LogoutIcon style={{ fontSize: fontSize, color: color }} />}
      ></Menu.Item>
    </React.Fragment>
  );

  const userSider = (
    <React.Fragment>
      <Menu.Item
        className="icon"
        icon={<DashboardIcon style={{ fontSize: fontSize, color: color }} />}
      ></Menu.Item>
      <Menu.Item
        className="icon"
        icon={<NotificationIcon style={{ fontSize: fontSize, color: color }} />}
      ></Menu.Item>
      <Menu.Item
        className="icon"
        icon={<HistoryIcon style={{ fontSize: fontSize, color: color }} />}
      ></Menu.Item>
      <Menu.Item
        className="icon"
        icon={<LogoutIcon style={{ fontSize: fontSize, color: color }} />}
      ></Menu.Item>
    </React.Fragment>
  );

  const menu = (
    <Menu mode="inline" theme="dark" className="dashboard-menu">
      {props.isAdmin ? adminSider : userSider}
    </Menu>
  );
  return (
    <div className="main">
      <div className="header">
        <NavBar menu={menu} />
      </div>
      <div className="dashboard-content">
        <Layout.Sider
          className="dashboard-sidebar"
          breakpoint={"lg"}
          theme="dark"
          collapsedWidth={0}
          trigger={null}
        >
          {menu}
        </Layout.Sider>

        <div className="main-content">
          <div id="top-bar">
            top bar
            <div className="dashboard-header">
              <div className="dashboard-header-left dashboard-col">
                {props.menu}
              </div>
              <div className="dashboard-header-right dashboard-col">
                <Button
                  id="add-button"
                  icon={<PlusOutlined />}
                  onClick={() => updateRedirectRoute("/request")}
                >
                  Add
                </Button>
              </div>
            </div>
            <div className="welcome-back-text">
              Welcome Back, {"Shahbakht Anwar"}
            </div>
          </div>
          {props.content}
        </div>
      </div>

      <div className="footer">footer</div>
    </div>
  );
};

export default Dashboard;
