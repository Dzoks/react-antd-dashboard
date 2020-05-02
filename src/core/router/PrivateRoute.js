import React from 'react';
let dom={};
try{
  dom=require('react-router-dom');
}catch(e){
}
const { Route, Redirect }=dom;
let whatToExport;
if (dom.Route){
  whatToExport=({ component: Component,allowed,redirectUrl, ...rest }) => (
    <Route {...rest} render={props => (
        allowed
            ? <Component {...rest} />
            : <Redirect to={{ pathname: redirectUrl, state: { from: props.location } }} />
    )} />
  );
}else{
  whatToExport=props=><div>No React Router</div>;
}

export default whatToExport;