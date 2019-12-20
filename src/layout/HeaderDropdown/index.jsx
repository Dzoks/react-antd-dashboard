import { Dropdown, Menu, Icon,Avatar } from "antd";
import React from "react";
import styles from "./index.less";

const menuHeaderDropdown = (
  <Menu className={styles.menu} selectedKeys={[]} >
    <Menu.Item key="settings">
      <Icon type="setting" />
      <span>Settings</span>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="logout">
      <Icon type="logout" />
      <span>Logout</span>
    </Menu.Item>
  </Menu>
);

const HeaderDropdown = props => (
  <Dropdown
    overlayClassName={styles.container}
    overlay={menuHeaderDropdown}
    {...props}
  >
    <span className={`${styles.action} ${styles.account}`}>
      <Avatar
        size="small"
        className={styles.avatar}
        //src={currentUser.avatar}
        alt="avatar"
      />
      <span className={styles.name}>Marko markovic</span>
    </span>
  </Dropdown>
);

export default HeaderDropdown;
