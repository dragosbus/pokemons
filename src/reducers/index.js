import {combineReducers} from 'redux';
import {pokesReducer} from './pokesReducer';
import {activePageReducer} from './activePageReducer';
import {totalPagesReducer} from './totalPagesReducer';
import {itemsPerPageReducer} from './itemsPerPageReducer';
import {toggleModalReducer} from './toggleModalReducer';
import {pokeDetailsReducer} from './pokeDetailsReducer';

const rootReducer = combineReducers({
    pokemons: pokesReducer,
    activePage: activePageReducer,
    totalPages: totalPagesReducer,
    itemsPerPage: itemsPerPageReducer,
    showModal: toggleModalReducer,
    details: pokeDetailsReducer
});

export default rootReducer;