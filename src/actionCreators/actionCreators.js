import * as ActionTypes from '../actionTypes/actionTypes';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokes = data => ({
    type: ActionTypes.GET_POKES,
    payload: data
});

export const setActivePage = index => ({
    type: ActionTypes.ACTIVE_PAGE,
    payload: index
});

export const totalPages = limit => ({
    type: ActionTypes.NUMBER_TOTAL_PAGES,
    payload: limit
});

export const changeItemsPerPage = n => ({
    type: ActionTypes.CHANGE_ITEMS_PER_PAGE,
    payload: n
});

export const toggleModal = () => ({
    type: ActionTypes.TOGGLE_MODAL
});

export const getPokemonDetails = data => ({
    type: ActionTypes.GET_DETAILS,
    payload: data
});

export const getPokesMiddleware = (limit) => dispatch => {
    let data = localStorage.getItem('pokemons');
    if (data === null) {
        fetch(`${BASE_URL}/pokemon/?limit=${limit}&offset=0`)
            .then(res => res.json())
            .then(res => {
                localStorage.setItem('pokemons', JSON.stringify(res.results))
            })
            .catch(err => console.log(err));
    } else {
        dispatch(getPokes(JSON.parse(data)));
        dispatch(totalPages(limit))
    }
};

export const fetchDetailsMiddleWare = url => dispatch => {
    fetch(url).then(res => res.json())
        .then(data => {
            console.log(data);
            dispatch(getPokemonDetails(data));
        });
};