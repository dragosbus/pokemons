import {combineReducers} from 'redux';
import {pokesReducer} from './pokesReducer';
import {activePageReducer} from './activePageReducer';
import {totalPagesReducer} from './totalPagesReducer';

const rootReducer = combineReducers({
    pokemons: pokesReducer,
    activePage: activePageReducer,
    totalPages: totalPagesReducer
});

export default rootReducer;