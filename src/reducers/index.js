import {combineReducers} from 'redux';
import {pokesReducer} from './pokesReducer';
import {activePageReducer} from './activePageReducer';

const rootReducer = combineReducers({
    pokemons: pokesReducer,
    activePage: activePageReducer
});

export default rootReducer;