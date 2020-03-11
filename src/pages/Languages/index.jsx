import React from 'react';
import View from '../../core/components/View';
function Languages(props){
    const {store}=props;
    return (<div className="page-container">
        Hello languages!
        <View page="languages" id="myButton" store={store} ><button style={{height:'max-content'}}>Click me</button></View>
    </div>)
}

export default Languages;