import React from 'react';

const Pokemon = props =>{

    return (
        <li className="pokemon" onClick={props.toggleModal}>
            <h2>{props.name}</h2>
        </li>
    );
};

export default Pokemon;