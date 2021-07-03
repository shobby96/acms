
 <Menu
 defaultSelectedKeys={["1"]}
 defaultOpenKeys={["sub1"]}
 mode="inline"
 theme="light"
 className="sider"
 inlineCollapsed={isCollapsed}
>
 {/* <Menu.Item key="1" icon={<DashboardIcon />} className='dashboard-menu-item'>
   Option 1
 </Menu.Item> */}
 {props.isAdmin ? adminSider : userSider}
</Menu>