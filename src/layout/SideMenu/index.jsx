import React from "react";
import "./index.css";
import { Menu, Layout, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
const { SubMenu } = Menu;
const { Sider } = Layout;

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: localStorage.getItem("collapsedMenu") || false
    };
  }

  onCollapse = collapsed => {
    localStorage.setItem("collapsedMenu", collapsed);
    this.setState({ collapsed });
  };

  renderMenuItem = item => {
    const { key, icon, value } = item;
    return (
      <Menu.Item key={key}>
        <Link to={`/${key}`}><Icon type={icon} /><span>{value}</span></Link>
      </Menu.Item>
    );
  };

  renderMenuItems = () => {
    const items = this.props.menuItems || [];
    return items.map(item => {
      if (!item.subItems || item.subItems.length === 0) {
        return this.renderMenuItem(item);
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.value}</span>
              </span>
            }
          >
            {item.subItems.map(subItem => this.renderMenuItem(subItem))}
          </SubMenu>
        );
      }
    });
  };

  render() {
    const logo=this.props.logo||<div className='logo'/>;
    const path=this.props.location.pathname;
    const item = path!=="/"?path.substr(1):this.props.menuItems[0].key || null;
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        {logo}
        <Menu theme="dark" defaultSelectedKeys={[item]} mode="inline">
          {this.renderMenuItems()}
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(SideMenu);
