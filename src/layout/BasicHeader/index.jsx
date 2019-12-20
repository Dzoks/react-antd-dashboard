import React from "react";
import HeaderDropdown from '../HeaderDropdown';
import {Layout} from "antd";
const BasicHeader = props => {
  return <Layout.Header style={{ background: "#fff", padding: 4,margin:2,display:'flex',justifyContent:'space-between' }}><span>My Application</span><HeaderDropdown /></Layout.Header>;
};
export default BasicHeader;
