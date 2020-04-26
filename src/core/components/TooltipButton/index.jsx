import React from "react";
import {Button, Tooltip} from "antd";
import "./index.css"
function TooltipButton({title,className,...rest}) {
    return (<Tooltip title={title}>
        <Button {...rest} type="circle" className={`action-btn ${className}`}  />
    </Tooltip>)
}

export default TooltipButton;