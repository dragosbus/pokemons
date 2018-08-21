import * as ActionTypes from '../actionTypes/actionTypes';


export const itemsPerPageReducer = (state=10, action) => {
    switch(action.type) {
        case ActionTypes.CHANGE_ITEMS_PER_PAGE:
            return action.payload;
        default:
            return state;
    }
};

