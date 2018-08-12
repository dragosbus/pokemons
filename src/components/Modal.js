import React from 'react';

const Modal = props => {
  return (
    <div className={props.showModal ? 'overlay modal-on' : 'overlay modal-off'}>
      <button className="close-modal" onClick={props.toggleModal}>x</button>
      <div className="modal">
        <div className="modal-title">
            <h3>{props.pokeName}</h3>
        </div>
      </div>
    </div>
  );
};

export default Modal;
