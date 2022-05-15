import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { Button } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroller";

import AddUserModal from "../AddUserModal/AddUserModal";

let InfiniteScrollContainer = (props) => {
  const { profileState } = useSelector((state) => ({
    profileState: state.signIn.profileState,
  }));
  const [redirectRoute, updateRedirectRoute] = useState("");
  const [addUserModalVisibility, updateAddUserModalVisibility] =
    useState(false);
  const location = useLocation();
  let counter = useRef(0);
  counter.current = counter.current + 1;

  let userAttributes = profileState["profile"] ? profileState["profile"] : {};
  let firstName = "firstName" in userAttributes ? userAttributes.firstName : "";
  let lastName = "lastName" in userAttributes ? userAttributes.lastName : "";
  if (redirectRoute) {
    return <Redirect push to={redirectRoute} />;
  }
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={props.loadFunc}
      hasMore={props.hasMore && !props.pauseInfiniteScrollCallback}
      loader={
        <div className="loader" key={0}>
          Loading ...
        </div>
      }
      useWindow={false}
      className="infinite-scroll-div"
    >
      <div id="top-bar">
        {`Counter ${counter.current}`}
        <div className="dashboard-header">
          <div className="dashboard-header-left dashboard-col">
            {props.menu}
          </div>
          <div className="dashboard-header-right dashboard-col">
            <Button
              id="dashboard-create-request-button"
              icon={<PlusCircleFilled />}
              shape="circle"
              onClick={() =>
                location.pathname === "/visitors"
                  ? updateRedirectRoute("/request")
                  : updateAddUserModalVisibility(true)
              }
            ></Button>
          </div>
        </div>
        <div className="welcome-back-text">
          Welcome Back, {`${firstName} ${lastName}`}
        </div>
      </div>
      {props.content()}
      <AddUserModal
        visibility={addUserModalVisibility}
        updateVisibility={updateAddUserModalVisibility}
      />
    </InfiniteScroll>
  );
};

export default InfiniteScrollContainer;
