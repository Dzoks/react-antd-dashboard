import React from 'react';
let dom={};
try{
  dom=require('react-router-dom');
}catch(e){
}
const { Route, Redirect }=dom;
let whatToExport;
if (dom.Route){
  whatToExport=({ component: Component,allowed,redirectUrl,children,store, ...rest }) => (
    <Route {...rest} render={props => (
        allowed
            ? children?React.cloneElement(children, {...props,store}):<Component store={store} {...props} />
            : <Redirect to={{ pathname: redirectUrl, state: { from: props.location } }} />
    )} />
);
}else{
  whatToExport=props=><div>No React Router</div>;
}

export default whatToExport;