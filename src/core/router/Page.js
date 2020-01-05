import React from 'react';
import PrivateRoute from "./PrivateRoute";

export default  ({ id,store,...rest }) =>{
    const other={...rest,store};
    return <PrivateRoute  {...other} allowed={store[id]} />
}
