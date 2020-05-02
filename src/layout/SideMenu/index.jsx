import React from "react";
import "./index.css";
import { Menu, Layout } from "antd";
const { SubMenu } = Menu;
const { Sider } = Layout;
let dom={};
try{
  dom=require('react-router-dom');
}catch(e){
}
const { Link, withRouter }=dom;
class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: localStorage.getItem("collapsedMenu")==="true",
      item:null
    };
  }
  
	componentWillUnmount(){
		this.unlisten();
	}

	componentDidMount() {
		const path = this.props.location.pathname;
		const item = path !== "/" ? path.substr(1) : this.props.menuItems[0].key || null;
		this.setState({item:item});

		this.unlisten = this.props.history.listen((location, action) => {
		const path = location.pathname;
		const item = path !== "/" ? path.substr(1) : this.props.menuItems[0].key || null;
		this.setState({item:item});
		});
	  }

  onCollapse = collapsed => {
    localStorage.setItem("collapsedMenu", collapsed);
    this.setState({ collapsed });
  };

  renderMenuItem = item => {
    const { key, icon, value } = item;
    return (
      <Menu.Item key={key}>
        <Link to={`/${key}`}>{icon} <span>{value}</span></Link>
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
                {item.icon}
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
    const logo=this.props.logo||null;
    const expandedLogo=this.props.expandedLogo||null
		return (
			<Sider
			  collapsible
				collapsed={this.state.collapsed}
				onCollapse={this.onCollapse}
			>
				{
					this.props.collapsed ?
						logo&&<img src={logo} alt="logo" className="side-menu-logo"/> :
						expandedLogo&&<img src={expandedLogo} alt="logo" className="side-menu-logo"/>
				}


				<Menu theme="dark" selectedKeys={[this.state.item]}  mode="inline" >
					{this.renderMenuItems()}
				</Menu>
			</Sider>
		);
	}
}

let whatToExport;
if (dom.Route){
  whatToExport=withRouter(SideMenu);
}else{
  whatToExport=props=><div>No React Router</div>;
}

export default whatToExport;