import React from 'react';
import "./index.css";
import { Typography, Button } from 'antd';
const Header=props=>{
    const {title,items,buttons}=props;
    return (<div className="basic-header">
        <Typography.Title level={3}>{title}</Typography.Title>
        <div className="basic-header-right-side">
                {items}
                {buttons&&buttons.map(({text,...rest})=><Button {...rest}>{text}</Button> )}
                {props.children}
        </div>
    </div>)
}

export default Header;