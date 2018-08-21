import * as ActionTypes from '../actionTypes/actionTypes';


export const totalPagesReducer = (state=0, action) => {
    switch(action.type) {
        case ActionTypes.NUMBER_TOTAL_PAGES:
            return action.payload / 10;
        default:
            return state;
    }
};

