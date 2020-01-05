import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default  ({ component: Component,allowed,redirectUrl, ...rest }) => (
    <Route {...rest} render={props => (
        allowed
            ? <Component {...rest} />
            : <Redirect to={{ pathname: redirectUrl, state: { from: props.location } }} />
    )} />
)