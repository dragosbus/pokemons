import React from 'react';
import Pokemon from './PokeElementList';

const PokeList = props => {
    return(
        <ul className="pokemons-list">
            {props.pokemons.map((poke, i)=> {
                return <Pokemon key={poke.name} {...poke} toggleModal={()=>props.toggleModal(i)}/>
            })}
        </ul>
    );
};

export default PokeList