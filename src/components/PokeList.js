import React from 'react';
import Pokemon from './PokeElementList';

const PokeList = props => {
    return(
        <ul className="pokemons-list">
            {props.pokemons.map(poke=> {
                return <Pokemon key={poke.name} {...poke}/>
            })}
        </ul>
    );
};

export default PokeList