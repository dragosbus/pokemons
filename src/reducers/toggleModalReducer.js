import * as ActionTypes from '../actionTypes/actionTypes';


export const toggleModalReducer = (state=false, action) => {
    switch(action.type) {
        case ActionTypes.TOGGLE_MODAL:
            return !state;
        default:
            return state;
    }
};

