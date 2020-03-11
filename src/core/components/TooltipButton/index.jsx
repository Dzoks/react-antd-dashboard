import React from "react";
import {Button, Tooltip} from "antd";
import "./index.css"
function TooltipButton(props) {
    return (<Tooltip title={props.title}>
        <Button type="circle" icon={props.icon} className={`action-btn ${props.className}`} size={props.size} style={props.style} onClick={props.onClick}/>
    </Tooltip>)
}

export default TooltipButton;