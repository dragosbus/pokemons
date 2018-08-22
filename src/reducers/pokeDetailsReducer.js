import * as ActionTypes from '../actionTypes/actionTypes';


export const pokeDetailsReducer = (state={}, action) => {
    switch(action.type) {
        case ActionTypes.GET_DETAILS:
            return action.payload;
        default:
            return state;
    }
};

