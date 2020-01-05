import React from 'react';
import View from "./View";
import { connect } from "react-redux";

function ViewRedux(props) {
    const {key,page}=props;
    return <View key={key} page={page} store={props.components} />
}

const mapStateToProps = state => {
    return {components:state.user.components};
};

export default connect(mapStateToProps,{})(ViewRedux);