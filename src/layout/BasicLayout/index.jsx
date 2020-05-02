import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Layout,Result } from "antd";
import BasicHeader from "../BasicHeader";
import SideMenu from "../SideMenu";
import Page from "../../core/router/Page";
import Login from "../Login";
const { Content, Footer } = Layout;
let dom={};
try{
  dom=require('react-router-dom');
}catch(e){
}
const { BrowserRouter, Route, Switch }=dom;

function ForbiddenComponent(props) {
  return (<div className="page-container result-item" >
    <Result
      status="403"
      title="403"
    />
  </div>);
}

function NotFoundComponent(props) {
  return (<div className="page-container result-item" >
    <Result
      status="404"
      title="404"
    />
  </div>);
}
class BasicLayout extends React.Component {
  showAvailableRoutes = () => {
    const { menuItems, pages,otherItems } = this.props;
    const store = {};
    let firstItemKey = null;
    let firstItem = true;
    if (menuItems)
      menuItems.forEach(el => {
        if (el.subItems && el.subItems.length > 0)
          el.subItems.forEach(sub => {
            if (firstItem) {
              firstItem = false;
              firstItemKey = sub.key;
            }
            store[sub.key] = sub.rules || {};
          });
        else {
          if (firstItem) {
            firstItem = false;
            firstItemKey = el.key;
          }
          store[el.key] = el.rules || {};
        }
      });
    if (otherItems)
      otherItems.forEach(el=>{
        if (firstItem) {
          firstItem = false;
          firstItemKey = el.key;
        }
        store[el.key]=el.rules||{};
      });
    return pages.map(el => {
      const path = [`/${el.key}${el.hasParam?"/:param":""}`];
      if (firstItemKey === el.key) {
        path.push("/");
      }

      return (
        <Page
          key={el.key}
          exact
          component={el.component}
          path={path}
          id={el.key}
          store={store}
          redirectUrl={`/403`}
          {...el.componentProps}
        />
      );
    });
  };

  render() {
    const authenticated=this.props.authenticated||false;
    const CustomLoginComponent=this.props.loginPage;
    if (!authenticated)
      return CustomLoginComponent?<CustomLoginComponent onLogin={this.props.onLogin} logo={this.props.loginLogo} loginLogoStyle={this.props.loginLogoStyle} />:<Login onLogin={this.props.onLogin} logo={this.props.loginLogo} loginLogoStyle={this.props.loginLogoStyle} />;
    const {
      logo,
      dropdownItems,
      applicationName,
      menuItems,
      user,
      footerStyle,
      footer,
      notFound,
      forbidden,
      expandedLogo
    } = this.props;
    const forbiddenPage = forbidden || ForbiddenComponent;
    const notFoundPage = notFound || NotFoundComponent;
    return (
      <BrowserRouter>
        <Layout style={{ minHeight: "100vh" }}>
          {menuItems&&<SideMenu logo={logo} expandedLogo={expandedLogo} menuItems={menuItems} />}
          <Layout>
            <BasicHeader
              user={user}
              applicationName={applicationName}
              menuItems={dropdownItems}
            >
            {this.props.headerComponents}
            </BasicHeader>
            <Content style={{ margin: "0 16px" }}>
              <Switch>
                <Route path="/403" exact component={forbiddenPage} />
                {this.showAvailableRoutes()}
                <Route component={notFoundPage} />
              </Switch>
            </Content>
            <Footer style={footerStyle || { textAlign: "center" }}>
              {footer}
            </Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

let whatToExport;
if (dom.Route){
  whatToExport=BasicLayout
}else{
  whatToExport=props=><div>No React Router</div>;
}

export default whatToExport;
