import React from "react";

import HeaderDropdown from '../HeaderDropdown';
import {Layout} from "antd";
import "./index.css";
const BasicHeader = props => {
  const {user,menuItems}=props;
  return <Layout.Header className="container"><span>{props.applicationName}</span><HeaderDropdown user={user} menuItems={menuItems} /></Layout.Header>;
};
export default BasicHeader;
