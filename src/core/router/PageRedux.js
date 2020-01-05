import React from 'react';
import Page from "./Page";
import { connect } from "react-redux";

function PageRedux({ components,...rest }) {
    return <Page  {...rest} store={components}/>
}

const mapStateToProps = state => {
    return {components:state.user.components};
};

export default connect(mapStateToProps,{})(PageRedux);