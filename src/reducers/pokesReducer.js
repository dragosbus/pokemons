import * as ActionTypes from '../actionTypes/actionTypes';


export const pokesReducer = (state=[], action) => {
    switch(action.type) {
        case ActionTypes.GET_POKES:
            return [...action.payload];
        default:
            return state;
    }
};

