import {combineReducers} from 'redux';
import {pokesReducer} from './pokesReducer';

const rootReducer = combineReducers({
    pokemons: pokesReducer
});

export default rootReducer;