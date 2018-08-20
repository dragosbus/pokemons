import React from 'react';
import PokeInfo from './PokeInfo';

const Modal = props => {
  let pokemon = props.pokemon;

  let el = props.showModal ? (
    <div className={props.showModal ? 'overlay modal-on' : 'overlay modal-off'}>
      <div className="modal">
        <div className="modal-title">
          <h3>{pokemon ? pokemon.name : ''}</h3>
        </div>
        <div className="modal-body">
          <PokeInfo stats={pokemon ? pokemon.stats : []} />
        </div>
        <div className="modal-footer">
          <button className="close-modal" onClick={props.toggleModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  ) : (
    ''
  );

  return el;
};

export default Modal;
