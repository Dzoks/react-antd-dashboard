import React from 'react';

function Parameterized(props){
    return <div>Parameter value is {props.computedMatch.params.param}. Try it yourself, change parameter in URL directly.</div>
}

export default Parameterized;