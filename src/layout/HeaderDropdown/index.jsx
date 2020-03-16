import { Dropdown, Menu, Avatar } from "antd";
import React from "react";
import './index.css';
import {UserOutlined} from '@ant-design/icons';
const menuHeaderDropdown = menuItems=>{
  const onClick = ({ key }) => {
    const item=menuItems.find(i=>i.key===key);
    if (item&& item.callback)
      item.callback();
  };
  return (
    <Menu onClick={onClick}  selectedKeys={[]} >
      {menuItems.map(item=>{
        const {key,icon,value}=item;
        return (
            <Menu.Item key={key}>
              {icon}
              <span>{value}</span>
        </Menu.Item>);
      })}
    </Menu>
  );
} 

const HeaderDropdown = props =>{
    const {user,menuItems}=props;
    if (!user)
      return null;
    const {firstName,lastName,avatar}=user;
    return (
      <Dropdown 
        overlay={menuHeaderDropdown(menuItems)}
        {...props}
      >
        <div className='header-container' >
          {avatar?<Avatar
            size="small"
            src={avatar}
            style={{marginRight:4}}
          />:<Avatar size="small" style={{marginRight:4}} icon={<UserOutlined/>}/>}
          <span>{firstName} {lastName}</span>
        </div>
      </Dropdown>
    )
}; ;

export default HeaderDropdown;
