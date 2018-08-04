import React from 'react';
import Pokemon from './PokeElementList';

const PokeList = props => {
    return(
        <ul>
            {props.pokemons.map(poke=> {
                return <Pokemon key={poke.name} {...poke}/>
            })}
        </ul>
    );
};

export default PokeList