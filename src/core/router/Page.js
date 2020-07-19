import React from 'react';
import PrivateRoute from "./PrivateRoute";

export default  ({ id,store,...rest }) => (
    <PrivateRoute store={store}  {...rest} allowed={store[id]} />
)
