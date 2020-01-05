import React from 'react';
import {ViewState} from "../enum";

function View(props) {
    const {page,id,store}=props;
    let hidden=false,disabled=false;
    if (page && id){
        const state=store[page][id];
        // eslint-disable-next-line default-case
        switch (state) {
            case ViewState.DISABLED:
                disabled=true;
                break;
            case ViewState.HIDDEN:
                hidden=true;
        }
    }
    return (
        <React.Fragment>
            {!hidden && React.cloneElement(props.children, {disabled})}
        </React.Fragment>
    );
}

export default View;