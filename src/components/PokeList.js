import React from 'react';
import Pokemon from './PokeElementList';

const PokeList = props => {

    const toggleModal = (index, url) => {
        props.toggleModal(index);
        props.getDetails(url);
    };

    return(
        <ul className="pokemons-list">
            {props.pokemons.map((poke, i)=> {
                return <Pokemon key={poke.name} {...poke} toggleModal={()=>toggleModal(i, props.pokemons[i].url)}/>
            })}
        </ul>
    );
};

export default PokeList