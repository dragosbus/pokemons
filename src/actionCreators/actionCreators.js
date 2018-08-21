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