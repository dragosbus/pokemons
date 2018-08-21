import {combineReducers} from 'redux';
import {pokesReducer} from './pokesReducer';
import {activePageReducer} from './activePageReducer';
import {totalPagesReducer} from './totalPagesReducer';
import {itemsPerPageReducer} from './itemsPerPageReducer';

const rootReducer = combineReducers({
    pokemons: pokesReducer,
    activePage: activePageReducer,
    totalPages: totalPagesReducer,
    itemsPerPage: itemsPerPageReducer
});

export default rootReducer;