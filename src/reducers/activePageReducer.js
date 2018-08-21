import * as ActionTypes from '../actionTypes/actionTypes';


export const activePageReducer = (state=0, action) => {
    switch(action.type) {
        case ActionTypes.ACTIVE_PAGE:
            return action.payload;
        default:
            return state;
    }
};

