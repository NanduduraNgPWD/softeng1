import React from "react";
import "./Modal.css"; // Create this CSS file for styling the modal


const Modal = ({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button onClick={onClose} className="modal-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
