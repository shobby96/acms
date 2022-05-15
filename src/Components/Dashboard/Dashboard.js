import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Redirect } from "react-router";
import { Menu, Layout, Card } from "antd";
import { useSelector } from "react-redux";
import {
  IdcardOutlined,
  UserOutlined,
  NotificationOutlined,
  HistoryOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import NavBar from "../Navbar/Navbar";
import RadialBarChart from "./Radialbar";
import SparkWidget from "./SparkWidget";
import AddUserModal from "../AddUserModal/AddUserModal";
import Visitors from "../Visitors/Visitors";
import Users from "../Users/Users";
import { subscribeUser } from "../../subscription";
import {
  DashboardIcon,
  HistoryIcon,
  LogoutIcon,
  NotificationIcon,
} from "./Icons";

import "./Dashboard.css";
import "../Common/CSS/Common.css";
import "antd/dist/antd.css";

const Dashboard = (props) => {
  const { profileState } = useSelector((state) => ({
    profileState: state.signIn.profileState,
  }));

  useEffect(() => {
    subscribeUser(profileState.profile._id);

    return () => console.log("Unmounting");
  }, [JSON.stringify(profileState.profile), props]);
  const location = useLocation();

  const getContentComponent = () => {
    switch (location.pathname) {
      case "/visitors":
        return <Visitors />;
      case "/users":
        return <Users />;
      default:
        break;
    }
  };
  const contentComponent = useMemo(() => {
    return getContentComponent();
  }, [location.pathname]);

  const [redirectRoute, updateRedirectRoute] = useState("");
  const [addUserModalVisibility, updateAddUserModalVisibility] =
    useState(false);

  const menuClickHandler = ({ item, key, keyPath, domEvent }) => {
    if (key && key !== location.pathname && isNaN(key)) {
      updateRedirectRoute(key);
    }
  };

  if (redirectRoute) {
    return <Redirect push to={redirectRoute} />;
  }

  if (!Object.keys(profileState.profile).length) {
    return <Redirect to={"/"}></Redirect>;
  }
  // const fontSize = "calc(70px + (80 - 70) * ((100vw - 300px) / (1600 - 300)))";
  const fontSize = "30px";
  const color = "white";
  const adminSider = (
    <React.Fragment>
      <Menu.Item
        className="icon"
        key="/visitors"
        icon={<IdcardOutlined style={{ fontSize: fontSize, color: color }} />}
      >
        {" "}
      </Menu.Item>
      <Menu.Item
        className="icon"
        key="/users"
        icon={<UserOutlined style={{ fontSize: fontSize, color: color }} />}
      ></Menu.Item>
      <Menu.Item
        className="icon"
        key="1"
        icon={
          <NotificationOutlined style={{ fontSize: fontSize, color: color }} />
        }
      ></Menu.Item>
      <Menu.Item
        className="icon"
        key="2"
        icon={<HistoryOutlined style={{ fontSize: fontSize, color: color }} />}
      ></Menu.Item>
      <Menu.Item
        className="icon"
        key="/"
        icon={<LogoutOutlined style={{ fontSize: fontSize, color: color }} />}
      ></Menu.Item>
    </React.Fragment>
  );

  const userSider = (
    <React.Fragment>
      <Menu.Item
        className="icon"
        key="4"
        icon={<DashboardIcon style={{ fontSize: fontSize, color: color }} />}
      ></Menu.Item>
      <Menu.Item
        className="icon"
        key="5"
        icon={<NotificationIcon style={{ fontSize: fontSize, color: color }} />}
      ></Menu.Item>
      <Menu.Item
        className="icon"
        key="6"
        icon={<HistoryIcon style={{ fontSize: fontSize, color: color }} />}
      ></Menu.Item>
      <Menu.Item
        className="icon"
        key="/"
        icon={<LogoutIcon style={{ fontSize: fontSize, color: color }} />}
      ></Menu.Item>
    </React.Fragment>
  );

  const menu = () => {
    return (
      <Menu
        mode="inline"
        theme="dark"
        className="dashboard-menu"
        onSelect={menuClickHandler}
      >
        {/* {props.isAdmin ? adminSider : userSider} */}
        {adminSider}
      </Menu>
    );
  };

  return (
    <div className="main">
      <div className="header">
        <NavBar menu={menu} props={props} />
      </div>
      <div className="dashboard-content">
        <Layout.Sider
          className="dashboard-sidebar"
          breakpoint={"lg"}
          // theme="dark"
          collapsedWidth={0}
          trigger={null}
        >
          {menu()}
        </Layout.Sider>

        <div className="main-content">
          <div id="dashboard-statistics-card-container-div">
            <Card className="dashboard-statistic-card">
              <div className="dashboard-statistic-metric-details-div">
                <div>Sales</div>
                <div>22</div>
              </div>
              <SparkWidget></SparkWidget>
            </Card>
            <Card className="dashboard-statistic-card">
              <RadialBarChart />
            </Card>
            {/* <Card className="dashboard-statistic-card">
              <PieChart />
            </Card> */}
          </div>
          {contentComponent}
        </div>
      </div>
      <AddUserModal
        visibility={addUserModalVisibility}
        updateVisibility={updateAddUserModalVisibility}
      />

      {/* <div className="footer">footer</div> */}
    </div>
  );
};

export default Dashboard;
