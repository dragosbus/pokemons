import * as ActionTypes from '../actionTypes/actionTypes';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokes = data => ({
    type: ActionTypes.GET_POKES,
    payload: data
});

export const getPokesMiddleware = (limit) => dispatch => {
    let data = localStorage.getItem('pokemons');
    if (data === null) {
      fetch(`${BASE_URL}/pokemon/?limit=${limit}&offset=0`)
        .then(res => res.json())
        .then(res => localStorage.setItem('pokemons', JSON.stringify(res.results)))
        .catch(err => console.log(err));
    } else {
        dispatch(getPokes(data));
    }
};