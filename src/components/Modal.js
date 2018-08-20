import React from 'react';

const Modal = props => {
  let pokemon = props.pokemon;

  return (
    <div className={props.showModal ? 'overlay modal-on' : 'overlay modal-off'}>
      <div className="modal">
        <div className="modal-title">
            <h3>{pokemon ? pokemon.name : ''}</h3>
        </div>
        <div className="modal-body">
          body
        </div>
        <div className="modal-footer">
          <button className="close-modal" onClick={props.toggleModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
